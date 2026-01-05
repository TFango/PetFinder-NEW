import { homePetsLayout } from "../layout/homePets/homePetsLayout";
import { createHeader } from "../components/header/header";
import { appState } from "../store/state";
import { goTo } from "../router/router";
import { createPetCard } from "../components/petCard/petCard";
import { createReportInfoModal } from "../components/reportInfoModal/reportInfoModal";

export async function homePetsPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = homePetsLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotPetsList = view.querySelector<HTMLElement>("#pets-list");
  if (!slotPetsList) return;

  const saved = localStorage.getItem("lastKnownLocation");
  if (!saved) {
    goTo("/chooseLocation");
    return;
  }

  const { lat, lng } = JSON.parse(saved);

  const pets = await appState.getNearbyPets(lat, lng);

  pets.forEach((pet: any) => {
    const card = createPetCard({
      id: pet.objectID,
      name: pet.name,
      imageUrl: pet.imageUrl,
      location: pet.location,
      button: {
        text: "Reportar",
        className: "btn--petsNearby",
        onClick: () => {
          const modal = createReportInfoModal({
            petName: pet.name,
            onSubmit: async (data) => {
              const res = await appState.createReport(pet.objectID, {
                name: data.name,
                reporterPhone: data.phone,
                location: data.message,
              });
              console.log(res);
            },
          });
          document.body.appendChild(modal);
        },
      },
    });

    slotPetsList.appendChild(card);
  });
}
