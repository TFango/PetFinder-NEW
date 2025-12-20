import { loginLayout } from "../layout/auth/authEmailLayout";
import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";

export function authEmailPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = loginLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const slotBtnUbi = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtnUbi) {
    const startBtn = createButton({
      text: "Siguiente",
      className: "btn--blue",
    });
    slotBtnUbi.replaceWith(startBtn.el);
  }
}
