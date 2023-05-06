import React, { useEffect, useState } from "react";
import {
  get as getFromStorage,
  set as saveToStorage,
} from "@services/storage/storageService";

export default function useSettingsHook<T>(
  key: string
): [T, (value: T) => Promise<void>] {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    getFromStorage(key).then((result) => {
      const value = result?.[key] || "";
      setValue(value);
    });
  }, [value]);

  const setter = (value: T): Promise<void> => {
    return saveToStorage({ [key]: value }).then(() => setValue(value));
  };

  return [value, setter];
}
