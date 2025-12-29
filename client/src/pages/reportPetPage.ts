import { createDropzoneComponent } from "../components/dropzone/dropzone";
import { createHeader } from "../components/header/header";
import { createMapPicker } from "../components/mapbox/mapbox";
import { reportPetLayout } from "../layout/reportPet/reportPetLayout";
import { createButton } from "../components/button/button";
import { goTo } from "../router/router";
import { appState } from "../store/state";

export function reportPetPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = reportPetLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

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

  const btnPicturSlot = view.querySelector<HTMLDivElement>("#btn-picture");
  if (btnPicturSlot) {
    const startBtn = createButton(
      {
        text: "Agregar foto",
        className: "btn--blue",
      },
      () => {
        dropzone?.openFileDialog();
      }
    );
    btnPicturSlot.replaceWith(startBtn.el);
  }

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const slotMap = view.querySelector<HTMLDivElement>("#slot-map");
  const locationInput = view.querySelector<HTMLInputElement>("#location-input");

  let mapPicker = null;
  const savedLocation = localStorage.getItem("lastKnownLocation");

  const initialLocation = savedLocation ? JSON.parse(savedLocation) : undefined;

  if (slotMap) {
    mapPicker = createMapPicker({
      element: slotMap,
      accessToken: MAPBOX_TOKEN,
      initialLocation,
    });

    if (initialLocation) {
      mapPicker.setLocation(initialLocation); // 👈 CLAVE
    }
  }

  slotMap?.addEventListener("click", async () => {
    const location = mapPicker?.getLocation();
    if (!location || !locationInput) return;

    try {
      const address = await reverseGeocode(
        location.lat,
        location.lng,
        MAPBOX_TOKEN
      );

      locationInput.value = address;
    } catch {
      locationInput.value = "Ubicación seleccionada";
    }
  });

  const nameInput = view.querySelector<HTMLInputElement>("#name");

  const btnReportSlot = view.querySelector<HTMLDivElement>("#btn-report");
  if (btnReportSlot) {
    const startBtn = createButton(
      {
        text: "Reportar mascota",
        className: "btn--green",
      },
      () => {
        const name = nameInput?.value;
        const location = mapPicker?.getLocation();
        const files = dropzone?.getFiles();
        console.log(String(location?.lat));
        console.log(location?.lng);

        if (!name) {
          alert("Ingresá un nombre");
          return;
        }

        if (!location) {
          alert("Marcá la ubicación de la mascota en el mapa");
          return;
        }

        if (!files || files.length === 0) {
          alert("Agregá una foto");
          return;
        }

        appState.createPet(
          name,
          String(location.lat),
          String(location.lng),
          files[0] // 👈 EL File real
        );
      }
    );
    btnReportSlot.replaceWith(startBtn.el);
  }

  const btnCancelSlot = view.querySelector<HTMLDivElement>("#btn-cancel");
  if (btnCancelSlot) {
    const startBtn = createButton(
      {
        text: "Cancelar",
        className: "btn--gray",
      },
      () => {
        goTo("/");
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
