import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { createPetCard } from "../components/petCard/petCard";
import { myPetsLayout } from "../layout/myPets/myPetsLayout";
import { appState } from "../store/state";
import { goTo } from "../router/router";

export async function myPetsPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = myPetsLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const petsList = view.querySelector<HTMLElement>("#pets-list");
  if (!petsList) return;

  const pets = await appState.getMyPets();
  if (pets.length === 0) {
    goTo("/reportEmpty");
    return;
  }

  pets.forEach((pet: any) => {
    const card = createPetCard({
      id: pet.id,
      name: pet.name,
      imageUrl: pet.imageUrl,
      location: pet.location,
      button: {
        text: "Editar",
        className: "btn--myPets",
        onClick: (id) => goTo(`/editPet/${id}`),
      },
    });
    petsList.appendChild(card);
  });

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton({
      text: `Editar`,
      className: "btn--blue",
    });
    slotBtn.replaceWith(startBtn.el);
  }
}
