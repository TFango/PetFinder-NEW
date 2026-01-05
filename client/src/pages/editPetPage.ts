import { editPetLayout } from "../layout/editPet/editPetLayout";
import { createDropzoneComponent } from "../components/dropzone/dropzone";
import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { goTo } from "../router/router";
import { appState } from "../store/state";
import { createMapPicker } from "../components/mapbox/mapbox";

export async function editPetPage(
  root: HTMLElement,
  params?: { petId?: string }
) {
  root.innerHTML = "";

  const view = editPetLayout();
  root.appendChild(view);

  const petId = params?.petId;
  if (!petId) {
    root.textContent = "Mascota no encontrada";
    return;
  }

  const pet = await appState.getPetById(petId);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const nameInput = view.querySelector<HTMLInputElement>("#name")!;
  nameInput.value = pet.name;

  let dropzone = null;
  const slotDropzone = view.querySelector<HTMLDivElement>("#slot-dropzone");
  if (slotDropzone) {
    dropzone = createDropzoneComponent({
      element: slotDropzone,
      maxFiles: 1,
      acceptedFiles: "image/*",
      maxFilesizeMB: 5,
    });
  }

  if (pet.imageUrl) {
    dropzone?.setImageFromUrl(pet.imageUrl);
  }

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const slotMap = view.querySelector<HTMLDivElement>("#slot-map")!;
  const locationInput =
    view.querySelector<HTMLInputElement>("#location-input")!;

  locationInput.value = pet.locationText ?? "";

  const mapPicker = createMapPicker({
    element: slotMap,
    accessToken: MAPBOX_TOKEN,
  });

  mapPicker.setLocation({ lat: pet.lat, lng: pet.lng });

  slotMap?.addEventListener("click", async () => {
    const location = mapPicker.getLocation();
    if (!location) return;

    const address = await reverseGeocode(
      location.lat,
      location.lng,
      MAPBOX_TOKEN
    );
    locationInput.value = address;
  });

  const btnPicturSlot = view.querySelector<HTMLDivElement>("#btn-picture");
  if (btnPicturSlot) {
    const startBtn = createButton(
      {
        text: "Modificar foto",
        className: "btn--blue",
      },
      () => {
        dropzone?.openFileDialog();
      }
    );
    btnPicturSlot.replaceWith(startBtn.el);
  }

  const btnSaveSlot = view.querySelector<HTMLDivElement>("#btn-save");
  if (btnSaveSlot) {
    const startBtn = createButton(
      {
        text: "Guardar",
        className: "btn--blue",
      },
      async () => {
        const files = dropzone ? dropzone.getFiles() : [];
        const file = files.length > 0 ? files[0] : null;

        const location = mapPicker.getLocation();

        await appState.editPet(
          petId,
          {
            name: nameInput.value,
            lat: location?.lat ?? pet.lat,
            lng: location?.lng ?? pet.lng,
            locationText: locationInput.value,
          },
          file
        );
        goTo("/myPetsReported");
      }
    );
    btnSaveSlot.replaceWith(startBtn.el);
  }

  const btnReportSlot = view.querySelector<HTMLDivElement>("#btn-report");
  if (btnReportSlot) {
    const startBtn = createButton(
      {
        text: "Reportar como encontrada",
        className: "btn--green",
      },
      async () => {
        await appState.markPetAsFound(petId);
        alert("Mascota marcada como encontrada");
        goTo("/myPetsReported");
      }
    );
    btnReportSlot.replaceWith(startBtn.el);
  }

  const btnCancelSlot = view.querySelector<HTMLDivElement>("#btn-cancel");
  if (btnCancelSlot) {
    const startBtn = createButton(
      {
        text: "Eliminar reporte",
        className: "btn--red",
      },
      () => {
        goTo("/myPetsReported");
      }
    );
    btnCancelSlot.replaceWith(startBtn.el);
  }
}

async function reverseGeocode(
  lat: number,
  lng: number,
  token: string
): Promise<string> {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?language=es&access_token=${token}`
  );

  if (!res.ok) {
    throw new Error("Error obteniendo dirección");
  }

  const data = await res.json();

  // lo más común: calle + ciudad
  return data.features[0]?.place_name ?? "Ubicación seleccionada";
}
