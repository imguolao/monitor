import { createContext } from "react";
import { type ThemeExcludeAuto, THEME } from "@/utils/theme";

export type ThemeContextValue = {
  theme: ThemeExcludeAuto;
  toggleTheme: (theme: ThemeExcludeAuto) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: THEME.light,
  toggleTheme: () => {},
});
