import { loginLayout } from "../layout/login/loginLayout";
import { createHeader } from "../components/header/header";
import { createButton } from "../components/button/button";
import { appState } from "../store/state";

export function loginPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = loginLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const passwordInput = view.querySelector<HTMLInputElement>("#password");
  const errorEl = view.querySelector<HTMLParagraphElement>(
    ".lg-main__login-error"
  )!;

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Acceder",
        className: "btn--blue",
      },
      async () => {
        errorEl.hidden = true;
        const password = passwordInput?.value;

        if (!password) {
          alert("Ingrese los datos");
          return;
        }

        try {
          await appState.login(password);
        } catch (err: any) {
          errorEl.textContent = err.message;
          errorEl.hidden = false;
        }
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }
}
