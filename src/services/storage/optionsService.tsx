import { SETTINGS_DISABLED_ON, SETTINGS_ENABLED_ON, SETTINGS_KEYWORD_RULES } from "../constants";
import { get } from "./storageService";

export async function getRules() {
  const result = await get(SETTINGS_KEYWORD_RULES);

  return result?.[SETTINGS_KEYWORD_RULES] || [];
}

async function getEnabledOn() {
  const result = await get(SETTINGS_ENABLED_ON);

  return result?.[SETTINGS_ENABLED_ON] || null;
}

async function getDisabledOn() {
  const result = await get(SETTINGS_DISABLED_ON);

  return result?.[SETTINGS_DISABLED_ON] || null;
}

export async function getMatches() {
  const SEPARATOR = '\n';

  const enabledOn = await getEnabledOn();
  const disabledOn = await getDisabledOn();

  return {
    matches: enabledOn?.split(SEPARATOR) || ['<all_urls>'],
    excludeMatches: disabledOn?.split(SEPARATOR) || [],
  };
}