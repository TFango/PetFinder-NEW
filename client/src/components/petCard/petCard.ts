import { createButton } from "../button/button";
import "./petCard.css";

type PetCardPromps = {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
  onEdit?: (id: string) => void;
};

export function createPetCard({
  id,
  name,
  imageUrl,
  location,
  onEdit,
}: PetCardPromps): HTMLElement {
  const article = document.createElement("article");
  article.className = "mp-pet__card";
  article.dataset.petId = id;
  const shortLocation = location
    ? location.split(",").slice(0, 2).join(",")
    : "";

  article.innerHTML = `
    <img class="mp-pet__card-img" src=${imageUrl} alt="">

        <div class="mp-pet__card-footer">
            <section class="mp-pet__card-info">
                <h2 class="mp-pet__card-namePet">${name}</h2>
                <p class="mp-pet__card-location">${shortLocation}</p>
            </section>
            
        <div class="pet-card__btn-slot"></div>
    </div>
  
  `;

  const btnSlot = article.querySelector(
    ".pet-card__btn-slot"
  ) as HTMLDivElement;

  if (btnSlot && onEdit) {
    const editBtn = createButton(
      {
        text: "Editar",
        className: "btn--myPets",
      },
      () => onEdit(id)
    );

    btnSlot.appendChild(editBtn.el);
  }

  return article;
}
