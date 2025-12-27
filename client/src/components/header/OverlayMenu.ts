import { authEmailPage } from "../../pages/authEmailPage";
import { goTo } from "../../router/router";
import { appState } from "../../store/state";

export function OverlayMenu(onClose: () => void): HTMLElement {
  const overlay = document.createElement("div");
  overlay.className = "overlay-menu";

  overlay.innerHTML = `
  <div class="overlay-menu__content">
        <button class="overlay-menu__close" id="closeMenu">✕</button>

      <nav class="overlay-menu__nav">
        <button class="overlay-menu__item" data-route="/myData">
          Mis datos
        </button>
        <button class="overlay-menu__item" data-route="/myPetsReported">
          Mis mascotas reportadas
        </button>
        <button class="overlay-menu__item" data-route="/reportPet">
          Reportar mascota
        </button>
      </nav>

      <div class="overlay-menu__footer">
        <p id="email" class="overlay-menu__email"></p>
        <button class="overlay-menu__logout">CERRAR SESIÓN</button>
      </div>
    </div>
  `;

  const emailEl = overlay.querySelector<HTMLParagraphElement>(
    ".overlay-menu__email"
  )!;
  const logoutBtn = overlay.querySelector<HTMLButtonElement>(
    ".overlay-menu__logout"
  )!;
  const closeBtn = overlay.querySelector<HTMLButtonElement>(
    ".overlay-menu__close"
  )!;

  function render() {
    const email = localStorage.getItem("email");
    emailEl.textContent = email ?? "";
  }

  appState.subscribe(render);
  render();

  logoutBtn.addEventListener("click", () => {
    appState.logout();
    onClose();
  });

  overlay
    .querySelector(".overlay-menu__close")
    ?.addEventListener("click", onClose);

  overlay.querySelectorAll(".overlay-menu__item").forEach((item) => {
    item.addEventListener("click", () => {
      const route = item.getAttribute("data-route");
      if (!route) return;

      onClose();
      goTo(route);
    });
  });
  return overlay;
}
