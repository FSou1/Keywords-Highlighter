import React, { useCallback, useMemo } from "react";
import { findAndWrap } from "@src/lib/findAndWrapHTMLNodes";
import useMutationObservable, {
  DEFAULT_OPTIONS,
} from "../hooks/useMutationObservable";
import { buildFindTextRegExp } from "../utils/regExpHelper";

interface HighlighterProps {
  debounceTimeMs: number;
  keywords: string;
  highlightedClassName: string;
  highlightCompleteWords: boolean;
}

export default function Highlighter({
  debounceTimeMs,
  keywords,
  highlightedClassName,
  highlightCompleteWords,
}: HighlighterProps) {
  const onMutation = useCallback(() => {
    findAndWrap(document.body, {
      findTextRegExp: buildFindTextRegExp({ keywords, highlightCompleteWords }),
      wrapWithTag: "span",
      wrapWithClassName: highlightedClassName,
      wrapIf: (node: Text) => {
        return !node.parentElement.classList.contains(highlightedClassName);
      },
    });
  }, []);

  const options = useMemo(
    () => ({
      ...DEFAULT_OPTIONS,
      debounceTimeMs: debounceTimeMs,
    }),
    []
  );

  useMutationObservable(document, onMutation, options);

  return <div></div>;
}
