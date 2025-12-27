import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { myDataLayout } from "../layout/myData/myDataLayout";
import { goTo } from "../router/router";
import { appState } from "../store/state";

export function myDataPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = myDataLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const modifiDate = view.querySelector<HTMLDivElement>("#slot-btnData");
  if (modifiDate) {
    const startBtn = createButton(
      {
        text: "Modificar datos personales",
        className: "btn--blue",
      },
      () => {
        goTo("/profile");
      }
    );
    modifiDate.replaceWith(startBtn.el);
  }

  const modifiPass = view.querySelector<HTMLDivElement>("#slot-btnPass");
  if (modifiPass) {
    const startBtn = createButton(
      {
        text: "Modificar contraseña",
        className: "btn--blue",
      },
      () => {
        goTo("/changePassword");
      }
    );
    modifiPass.replaceWith(startBtn.el);
  }

  const emailEl = view.querySelector<HTMLParagraphElement>("#email")!;
  const logoutEl = view.querySelector<HTMLParagraphElement>("#logout")!;

  const { email } = appState.getState();
  emailEl.textContent = email ?? "";

  logoutEl.addEventListener("click", () => {
    appState.logout();
    goTo("/authEmail");
  });
}
