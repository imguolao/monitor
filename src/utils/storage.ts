function setItem(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T = any>(key: string): T | null {
  const str = localStorage.getItem(key);
  if (!str) {
    return null;
  }

  return JSON.parse(str) as T;
}

export const storage = {
  ...localStorage,
  setItem,
  getItem,
}
