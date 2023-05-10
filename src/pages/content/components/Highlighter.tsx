import React, { useCallback, useMemo } from "react";
import { findAndWrap } from "@src/lib/findAndWrapHTMLNodes";
import useMutationObservable, {
  DEFAULT_OPTIONS,
} from "../hooks/useMutationObservable";

interface HighlighterProps {
  debounceTimeMs: number;
  keywords: string;
  highlightedClassName: string;
}

export default function Highlighter({
  debounceTimeMs,
  keywords,
  highlightedClassName,
}: HighlighterProps) {
  const onMutation = useCallback(() => {
    findAndWrap(document.body, {
      findTextRegExp: new RegExp(keywords.replaceAll(",", "|"), "gi"),
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
