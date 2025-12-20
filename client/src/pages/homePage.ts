import { createHeader } from "../components/header/header";
import { createButton } from "../components/button/button";
import { homeLayout } from "../layout/home/homeLayouts";

export function homePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = homeLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotBtnUbi = view.querySelector<HTMLDivElement>("#slot-btnUbi");
  if (slotBtnUbi) {
    const startBtn = createButton({
      text: "Dar mi ubicación actual",
      className: "btn--blue",
    });
    slotBtnUbi.replaceWith(startBtn.el);
  }

  const slotBtnInfo = view.querySelector<HTMLDivElement>("#slot-btnInfo");
  if (slotBtnInfo) {
    const startBtn = createButton({
      text: "¿Cómo funciona Pet Finder?",
      className: "btn--green",
    });
    slotBtnInfo.replaceWith(startBtn.el);
  }
}
