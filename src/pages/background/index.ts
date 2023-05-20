import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { getMatches } from '@services/storage/optionsService';
import { EVENT_OPTIONS_SAVED } from "@src/services/constants";

const CONTENT_SCRIPT_ID = "highlighter-script";

function openOptionsOnPopup() {
  chrome.action.setPopup({ popup: '' });

  chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'src/pages/options/index.html' });
  });
}

function injectContentScripts({ js, css }) {
  getMatches()
    .then(({ matches, excludeMatches }) => {
      console.log('matches: ', matches);
      console.log('exclude matches: ', excludeMatches);
      chrome.scripting
        .registerContentScripts([{
          id: CONTENT_SCRIPT_ID,
          js: js,
          css: css,
          matches: matches,
          excludeMatches: excludeMatches,
          persistAcrossSessions: false,
        }])
        .then(() => console.log("registration complete"))
        .catch((err) => console.warn("unexpected error", err))
    });
}

function addEventListeners() {
  chrome.runtime.onMessage.addListener(({ type }) => {
    if (type === EVENT_OPTIONS_SAVED) {
      resetContentScripts()
        .then(() => registerContentScripts());
    }
  });
}

function registerContentScripts() {
  injectContentScripts({
    js: ["/src/pages/content/index.js"],
    css: ["/assets/css/contentStyle.css"]
  });
}

function resetContentScripts() {
  return chrome.scripting
    .unregisterContentScripts({
      ids: [CONTENT_SCRIPT_ID]
    })
}

function init() {
  openOptionsOnPopup();

  registerContentScripts();

  addEventListeners();
}

init();

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");