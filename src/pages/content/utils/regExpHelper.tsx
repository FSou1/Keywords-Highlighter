export function buildFindTextRegExp({
  keywords,
  highlightCompleteWords,
}): RegExp {
  return new RegExp(
    keywords
      .split(",")
      .map((word: string) => {
        if (highlightCompleteWords) {
          return `\\b${word}\\b`;
        } else {
          return word;
        }
      })
      .join("|"),
    "gi"
  );
}
