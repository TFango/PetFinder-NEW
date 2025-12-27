import { initRouter } from "./router/router";
import { appState } from "./store/state";

appState.init();
initRouter();
