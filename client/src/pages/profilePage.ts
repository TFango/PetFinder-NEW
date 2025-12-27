import { createButton } from "../components/button/button";
import { createHeader } from "../components/header/header";
import { profileLayout } from "../layout/profile/profileLayout";
import { appState } from "../store/state";

export function profilePage(root: HTMLElement) {
  root.innerHTML = "";

  const view = profileLayout();
  root.appendChild(view);

  const slotHeader = view.querySelector<HTMLDivElement>("#slot-header");
  if (slotHeader) {
    const startHeader = createHeader();
    slotHeader.replaceWith(startHeader.el);
  }

  const nameEl = view.querySelector<HTMLInputElement>("#name");
  const locationEl = view.querySelector<HTMLInputElement>("#location");

  const slotBtn = view.querySelector<HTMLDivElement>("#slot-btn");
  if (slotBtn) {
    const startBtn = createButton(
      {
        text: "Guardar",
        className: "btn--blue",
      },
      async () => {
        const name = nameEl?.value.trim();
        const location = locationEl?.value.trim();

        if (!name && !location) {
          alert("No hay cambios para guardar");
          return;
        }

        try {
          await appState.updateMe(name || undefined, location || undefined);
          alert("Datos actualizados correctamente");
        } catch (err: any) {
          alert(err.message || "Error al actualizar datos");
        } finally {
          startBtn.setDisabled(false);
        }
      }
    );
    slotBtn.replaceWith(startBtn.el);
  }

  function render() {
    const { name, location } = appState.getState();

    if (nameEl) nameEl.value = name ?? "";
    if (locationEl) locationEl.value = location ?? "";
  }

  appState.subscribe(render);
  render();
}
