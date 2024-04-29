import { storage } from "./storage";

export enum THEME {
  dark = "dark",
  light = "light",
  auto = "auto",
}

export type ThemeExcludeAuto = Exclude<`${THEME}`, "auto">;

export const STORAGE_THEME_KEY = "theme";

function getBrowserTheme(): ThemeExcludeAuto {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return THEME.dark;
  }

  return THEME.light; 
}

export function normalizeTheme(theme: `${THEME}`): ThemeExcludeAuto {
  if (theme === THEME.auto) {
    return getBrowserTheme();
  }

  return theme;
}

export function getTheme(): ThemeExcludeAuto {
  const themeList = Object.keys(THEME);
  const localTheme = storage.getItem(STORAGE_THEME_KEY);
  if (localTheme && themeList.includes(localTheme)) {
    return normalizeTheme(localTheme);
  }

  return getBrowserTheme();
}
