export function set(items: { [key: string]: any }): Promise<void> {
  return chrome.storage.local.set(items);
}

export function get(key?: string | string[]): Promise<object> {
  return chrome.storage.local.get(key);
}
