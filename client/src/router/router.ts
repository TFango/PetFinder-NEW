import { homePage } from "../pages/homePage";
import { authEmailPage } from "../pages/authEmailPage";
import { loginPage } from "../pages/loginPage";
import { registerPage } from "../pages/registerPage";
import { appState } from "../store/state";
import { myDataPage } from "../pages/myDataPage";
import { profilePage } from "../pages/profilePage";
import { changePassPage } from "../pages/changePassPage";
import { reportPetPage } from "../pages/reportPetPage";

const routes: Record<string, (root: HTMLElement) => void> = {
  "/": homePage,
  "/authEmail": authEmailPage,
  "/login": loginPage,
  "/register": registerPage,
  "/myData": myDataPage,
  "/profile": profilePage,
  "/changePassword": changePassPage,
  "/reportPet": reportPetPage,
};

const privateRoutes = ["/myData", "/myPetsReported", "/reportPet"];

const root = document.getElementById("app")!;
let cleanup: (() => void) | undefined;

function render() {
  cleanup?.();

  let route = location.hash.replace("#", "");

  if (route === "" || route === undefined) {
    route = "/";
  }

  if (privateRoutes.includes(route) && !appState.isAuthenticated()) {
    goTo("/authEmail");
    return;
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
