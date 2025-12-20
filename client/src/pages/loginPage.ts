import { loginLayout } from "../layout/login/loginLayout";
import { createHeader } from "../components/header/header";

export function loginPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = loginLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }
}
