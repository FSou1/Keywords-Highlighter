import { SETTINGS_KEYWORD_RULES } from "../constants";
import { get } from "./storageService";

export async function getRules() {
  const result = await get(SETTINGS_KEYWORD_RULES);

  return result?.[SETTINGS_KEYWORD_RULES] || [];
}
