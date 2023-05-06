import { ChangeEvent } from "react";
import "@pages/popup/Popup.css";
import { SETTINGS_DEBUG, SETTINGS_KEYWORDS } from "@services/constants";
import useSettingsHook from "./hooks/useSettingsHook";

const Popup = () => {
  const [debug, setDebug] = useSettingsHook<boolean>(SETTINGS_DEBUG);
  const [keywords, setKeywords] = useSettingsHook<string>(SETTINGS_KEYWORDS);

  const handleDebugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDebug(e.target.checked);
  };

  const handleKeywordsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setKeywords(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <fieldset>
          <legend>Settings</legend>

          <div>
            <div>
              <label htmlFor="debug">Debug popup: </label>
              <input
                type="checkbox"
                id="debug"
                name="debug"
                value="true"
                checked={debug}
                onChange={handleDebugChange}
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="keywords">Keywords: </label>
            </div>
            <textarea
              id="keywords"
              name="keywords"
              placeholder="A comma-separated string of words to highlight"
              cols={45}
              rows={8}
              value={keywords}
              onChange={handleKeywordsChange}
            />
          </div>
        </fieldset>
      </header>
    </div>
  );
};

export default Popup;
