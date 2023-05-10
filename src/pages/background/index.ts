import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

chrome.action.setPopup({ popup: '' });

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'src/pages/options/index.html' });
});

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");