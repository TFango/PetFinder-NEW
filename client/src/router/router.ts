import { homePage } from "../pages/homePage";
import { loginPage } from "../pages/authEmailPage";

const routes: Record<string, (root: HTMLElement) => void> = {
  "/": homePage,
  "/authEmail": loginPage,
};

const root = document.getElementById("app")!;
let cleanup: (() => void) | undefined;

function render() {
  cleanup?.();

  let route = location.hash.replace("#", "");

  if (route === "" || route === undefined) {
    route = "/";
  }

  const page = routes[route];
  if (!page) {
    root.textContent = "404";
    return;
  }

  const maybeCleanup = page(root);
  if (typeof maybeCleanup === "function") cleanup = maybeCleanup;
}

export function goTo(path: string) {
  location.hash = path;
}

export function initRouter() {
  window.addEventListener("hashchange", render);
  render();
}
