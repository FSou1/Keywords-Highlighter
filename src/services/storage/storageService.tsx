export function set(items: { [key: string]: any }): Promise<void> {
  return chrome.storage.sync.set(items);
}

export function get(key?: string | string[]): Promise<object> {
  return chrome.storage.sync.get(key);
}
