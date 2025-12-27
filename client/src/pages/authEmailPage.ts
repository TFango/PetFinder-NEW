import { loginLayout } from "../layout/auth/authEmailLayout";
import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { appState } from "../store/state";

export function authEmailPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = loginLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const input = view.querySelector<HTMLInputElement>(".ah-input");

  const slotBtnUbi = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtnUbi) {
    const startBtn = createButton(
      {
        text: "Siguiente",
        className: "btn--blue",
      },
      () => {
        const email = input?.value.trim();

        if (!email) {
          alert("Es necesario un email");
          return;
        }

        appState.checkEmail(email);
      }
    );
    slotBtnUbi.replaceWith(startBtn.el);
  }
}
