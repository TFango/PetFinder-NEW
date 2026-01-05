import { homePage } from "../pages/homePage";
import { authEmailPage } from "../pages/authEmailPage";
import { loginPage } from "../pages/loginPage";
import { registerPage } from "../pages/registerPage";
import { appState } from "../store/state";
import { myDataPage } from "../pages/myDataPage";
import { profilePage } from "../pages/profilePage";
import { changePassPage } from "../pages/changePassPage";
import { reportPetPage } from "../pages/reportPetPage";
import { editPetPage } from "../pages/editPetPage";
import { myPetsPage } from "../pages/myPetsPage";
import { reportEmptyPage } from "../pages/reportEmptyPage";

type PageFn = (
  root: HTMLElement,
  params?: Record<string, string>
) => void | (() => void) | Promise<void | (() => void)>;

const routes: Record<string, PageFn> = {
  "/": homePage,
  "/authEmail": authEmailPage,
  "/login": loginPage,
  "/register": registerPage,
  "/myData": myDataPage,
  "/profile": profilePage,
  "/changePassword": changePassPage,
  "/reportPet": reportPetPage,
  "/editPet": editPetPage, // 👈 base de la ruta dinámica
  "/myPetsReported": myPetsPage,
  "/reportEmpty": reportEmptyPage,
};

const privateRoutes = [
  "/myData",
  "/myPetsReported",
  "/reportPet",
  "/reportEmpty",
];

const root = document.getElementById("app")!;
let cleanup: (() => void) | undefined;

function render() {
  cleanup?.();

  let route = location.hash.replace("#", "") || "/";
  let params: Record<string, string> = {};

  if (route.startsWith("/editPet/")) {
    const parts = route.split("/");
    params.petId = parts[2];
    route = "/editPet";
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

  const result = page(root, params);

  if (result instanceof Promise) {
    result.then((maybeCleanup) => {
      if (typeof maybeCleanup === "function") cleanup = maybeCleanup;
    });
  } else {
    if (typeof result === "function") cleanup = result;
  }
}

export function goTo(path: string) {
  location.hash = path;
}

export function initRouter() {
  window.addEventListener("hashchange", render);
  render();
}
