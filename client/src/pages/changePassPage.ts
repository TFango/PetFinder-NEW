import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { changePassLayout } from "../layout/changePassword/changePassLayout";
import { appState } from "../store/state";

export function changePassPage(root: HTMLElement) {
  root.innerHTML = "";

  const view = changePassLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const passwordEl = view.querySelector<HTMLInputElement>("#pass");
  const confirmPassEl = view.querySelector<HTMLInputElement>("#confirmPass");

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Guardar",
        className: "btn--blue",
      },
      async () => {
        const pass = passwordEl?.value;
        const confirmPass = confirmPassEl?.value;

        if (!pass || !confirmPass) {
          alert("Todos los campos son obligatorios");
          return;
        }

        if (pass !== confirmPass) {
          alert("Las contraseñas deben de ser iguales");
          return;
        }

        try {
          await appState.changePass(pass);
          alert("Contraseña moficada con exito");
          passwordEl!.value = "";
          confirmPassEl!.value = "";
        } catch (err: any) {
          alert(err.message || "Error al actualizar datos");
        }
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }
}
