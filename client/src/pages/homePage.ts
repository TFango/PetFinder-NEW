import { createHeader } from "../components/header/header";
import { createButton } from "../components/button/button";
import { homeLayout } from "../layout/home/homeLayouts";
import { getCurrentLocation } from "../../util/lat&lng";
import { goTo } from "../router/router";

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
    const startBtn = createButton(
      {
        text: "Dar mi ubicación actual",
        className: "btn--blue",
      },
      async () => {
        try {
          const location = await getCurrentLocation();
          localStorage.setItem("lastKnownLocation", JSON.stringify(location));
          goTo("/petsNearby");
        } catch (err) {
          goTo("/chooseLocation");
        }
      }
    );
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
