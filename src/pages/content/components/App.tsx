import { useEffect, useState } from "react";
import { OBSERVABLE_DEBOUNCE_TIME_MS } from "@services/constants";
import { getRules } from "@src/services/storage/optionsService";
import { IKeywordRule } from "@src/pages/options/components/KeywordRule";
import Highlighter from "./Highlighter";

export default function App() {
  const [rules, setRules] = useState([]);

  const map = (rule: IKeywordRule) => {
    return {
      className: rule.id,
      keywords: rule.keywords,
      styles: rule.cssStyles,
      highlightCompleteWords: rule.highlightCompleteWords,
    };
  };

  const filter = (rule: IKeywordRule) => {
    return rule.keywords?.length;
  };

  useEffect(() => {
    getRules().then((rules) => {
      setRules(rules
        .filter(filter)
        .map(map));
    });
  }, []);

  return (
    <>
      {rules.map((rule) => (
        <Highlighter
          keywords={rule.keywords}
          highlightedClassName={rule.className}
          highlightCompleteWords={rule.highlightCompleteWords}
          debounceTimeMs={OBSERVABLE_DEBOUNCE_TIME_MS}
        />
      ))}
    </>
  );
}
