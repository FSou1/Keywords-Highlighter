import { createRoot } from "react-dom/client";
import DebugPopup from "@src/pages/content/components/DebugPopup";
import App from "@src/pages/content/components/App";
import { get } from "@services/storage/storageService";
import { SETTINGS_DEBUG } from "@services/constants";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { getRules } from "@src/services/storage/optionsService";

refreshOnUpdate("pages/content");

const displayDebugPopup = () => {
  const root = document.createElement("div");
  root.id = "chrome-extension-boilerplate-react-vite-content-debug-popup";
  document.body.append(root);

  createRoot(root).render(<DebugPopup />);
};

const initDebug = () => {
  get(SETTINGS_DEBUG).then((result) => {
    const debug = result?.[SETTINGS_DEBUG];
    if (debug) {
      displayDebugPopup();
    }
  });
};

const initApp = () => {
  const root = document.createElement("div");
  root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
  document.body.append(root);

  createRoot(root).render(<App />);
};

const addStyleBlock = (className: string, styles: string) => {
  if (!className || !styles) {
    return;
  }

  var sheet = document.createElement("style");
  sheet.innerHTML = `.${className} { ${styles} }`;
  document.body.appendChild(sheet);
};

const initStyles = () => {
  getRules().then((styles) => {
    for (const style of styles) {
      addStyleBlock(style.id, style.cssStyles);
    }
  });
};

function init() {
  initStyles();
  initApp();
  initDebug();
}

init();
