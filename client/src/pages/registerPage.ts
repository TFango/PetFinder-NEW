import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { registerLayout } from "../layout/register/registerLayout";
import { goTo } from "../router/router";
import { appState } from "../store/state";

export function registerPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = registerLayout();
  root.appendChild(view);

  const slotHedaer = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHedaer) {
    const startHeader = createHeader();
    slotHedaer.replaceWith(startHeader.el);
  }

  const linkEl = view.querySelector<HTMLLinkElement>("#rg-link");
  linkEl?.addEventListener("click", (e) => {
    e.preventDefault();
    goTo("/login");
  });

  const nameInput = view.querySelector<HTMLInputElement>("#name");
  const emailInput = view.querySelector<HTMLInputElement>("#email");
  const passwordInput = view.querySelector<HTMLInputElement>("#password");
  const confirmPasswordInput =
    view.querySelector<HTMLInputElement>("#confirmPassword");

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Siguiente",
        className: "btn--blue",
      },
      () => {
        const name = nameInput?.value.trim();
        const email = emailInput?.value;
        const password = passwordInput?.value;
        const confirmPassword = confirmPasswordInput?.value;

        if (!name || !email || !password || !confirmPassword) {
          alert("Todos los campos son obligatorios");
          return;
        }

        if (password !== confirmPassword) {
          alert("Las contraseñas deben ser iguales");
          return;
        }

        appState.register({
          name,
          email,
          password,
        });
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }
}
