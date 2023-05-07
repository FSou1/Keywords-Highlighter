import { createRoot } from "react-dom/client";
import DebugPopup from "@src/pages/content/components/DebugPopup";
import App from "@src/pages/content/components/App";
import { get } from "@services/storage/storageService";
import {
  SETTINGS_DEBUG,
  SETTINGS_HIGHLIGHTED_STYLES,
  SETTINGS_HIGHLIGHTED_STYLES_DEFAULT_VALUE,
} from "@services/constants";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

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

const addStyleBlock = (styles: string) => {
  var sheet = document.createElement("style");
  sheet.innerHTML = `.highlighted { ${styles} }`;
  document.body.appendChild(sheet);
};

const initStyles = () => {
  const key = SETTINGS_HIGHLIGHTED_STYLES,
    defaultValue = SETTINGS_HIGHLIGHTED_STYLES_DEFAULT_VALUE;

  get(key).then((result) => {
    const highlightedStyles = result?.[key] || defaultValue;
    if (highlightedStyles) {
      addStyleBlock(highlightedStyles);
    }
  });
};

function init() {
  initStyles();
  initApp();
  initDebug();
}

init();
