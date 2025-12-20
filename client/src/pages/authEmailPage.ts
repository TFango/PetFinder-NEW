import { loginLayout } from "../layout/auth/authEmailLayout";
import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";

export function loginPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = loginLayout();
  root.appendChild(view);
}
