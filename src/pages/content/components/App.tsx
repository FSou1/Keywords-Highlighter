import { useEffect, useState } from "react";
import { get } from "@services/storage/storageService";
import {
  SETTINGS_KEYWORDS,
  OBSERVABLE_DEBOUNCE_TIME_MS,
} from "@services/constants";
import Highlighter from "./Highlighter";

export default function App() {
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    get(SETTINGS_KEYWORDS).then((result) => {
      const keywords = result?.[SETTINGS_KEYWORDS] || null;
      if (keywords) {
        setKeywords(keywords);
      }
    });
  }, []);

  if (!keywords) {
    return;
  }

  return (
    <Highlighter
      keywords={keywords}
      debounceTimeMs={OBSERVABLE_DEBOUNCE_TIME_MS}
    />
  );
}
