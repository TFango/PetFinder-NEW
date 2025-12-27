import { OverlayMenu } from "./OverlayMenu";
import { goTo } from "../../router/router";
import "./header.css";

export function createHeader() {
  const header = document.createElement("header");
  header.className = "lb-header";

  let isMenuOpen = false;
  let overlay: HTMLElement | null = null;

  header.innerHTML = `
  <div class="lb-header__container">
      <img src="src/assets/logo.svg" alt="" class="lb-header__img-logo" />

      <img src="src/assets/menu.svg" alt="" class="lb-header__img-menu" />
  </div>

  `;

  const logo = header.querySelector(".lb-header__img-logo") as HTMLImageElement;
  const menuBtn = header.querySelector(
    ".lb-header__img-menu"
  ) as HTMLImageElement;

  logo.addEventListener("click", () => {
    goTo("/");
  });

  function openMenu() {
    if (isMenuOpen) return;

    overlay = OverlayMenu(closeMenu);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay?.classList.add("overlay-menu--open");
    });

    isMenuOpen = true;
  }

  function closeMenu() {
    overlay?.classList.remove("overlay-menu--open");
    overlay?.remove();
    isMenuOpen = false;
  }

  menuBtn.addEventListener("click", openMenu);

  return { el: header };
}
