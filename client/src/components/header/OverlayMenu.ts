import { goTo } from "../../router/router";

export function OverlayMenu(onClose: () => void): HTMLElement {
  const overlay = document.createElement("div");
  overlay.className = "overlay-menu";

  overlay.innerHTML = `
  <div class="overlay-menu__content">
        <button class="overlay-menu__close" id="closeMenu">✕</button>

      <nav class="overlay-menu__nav">
        <button class="overlay-menu__item" data-route="/profile">
          Mis datos
        </button>
        <button class="overlay-menu__item" data-route="/myPets">
          Mis mascotas reportadas
        </button>
        <button class="overlay-menu__item" data-route="/reportPet">
          Reportar mascota
        </button>
      </nav>

      <div class="overlay-menu__footer">
        <p class="overlay-menu__email">tobiasfacellodeveloper@gmail.com</p>
        <button class="overlay-menu__logout">CERRAR SESIÓN</button>
      </div>
    </div>
  `;

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
