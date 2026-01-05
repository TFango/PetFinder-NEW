import { initRouter } from "./router/router";
import { appState } from "./store/state";

(async () => {
  await appState.init();
  initRouter();
})();
