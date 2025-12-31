import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { myPetsLayout } from "../layout/myPets/myPetsLayout";

export function myPetsPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = myPetsLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton({
      text: `Editar`,
      className: "btn--blue",
    });
    slotBtn.replaceWith(startBtn.el);
  }
}
