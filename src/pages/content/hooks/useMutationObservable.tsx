import React, { useEffect, useState } from "react";
import throttle from "lodash.throttle";

export const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
  debounceTimeMs: 0,
};

export default function useMutationObservable(
  targetEl,
  onMutation,
  options = DEFAULT_OPTIONS
) {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const { debounceTimeMs } = options;

    const obs = new MutationObserver(
      debounceTimeMs > 0 ? throttle(onMutation, debounceTimeMs) : onMutation
    );

    setObserver(obs);
  }, [onMutation, options]);

  useEffect(() => {
    if (!observer) {
      return;
    }

    const { config } = options;
    observer.observe(targetEl, config);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl]);
}
