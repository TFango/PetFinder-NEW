import { chooseLocationLayout } from "../layout/chooseLocation/chooseLocationLayout";
import { createHeader } from "../components/header/header";
import { createButton } from "../components/button/button";
import { createMapPicker } from "../components/mapbox/mapbox";
import { goTo } from "../router/router";

export function chooseLocationPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = chooseLocationLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const map = createMapPicker({
    element: view.querySelector<HTMLDivElement>("#map")!,
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
  });

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Usar esta ubicacion",
        className: "btn--blue",
      },
      () => {
        const loc = map.getLocation();
        if (!loc) return alet("Elegí una ubicación");

        localStorage.setItem("lastKnownLocation", JSON.stringify(loc));
        goTo("/petsNearby");
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }
}
