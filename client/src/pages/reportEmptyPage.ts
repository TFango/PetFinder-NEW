import { reportEmptyLayout } from "../layout/reportEmpty/reportEmptyLayout";
import { createHeader } from "../components/header/header";
import { createButton } from "../components/button/button";
import { goTo } from "../router/router";

export function reportEmptyPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = reportEmptyLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Publicar reporte",
        className: "btn--blue",
      },
      () => {
        goTo("/reportPet");
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }
}
