import { useContext, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@/contexts/theme";
import { THEME, STORAGE_THEME_KEY, normalizeTheme } from "@/utils/theme";
import { storage } from "@/utils/storage";

const themeList = Object.keys(THEME);

function getDefaultTheme(): `${THEME}` {
  const localTheme = storage.getItem(STORAGE_THEME_KEY);
  if (localTheme && themeList.includes(localTheme)) {
    return localTheme;
  }

  return THEME.auto;
}

function ThemeSwitch() {
  const { toggleTheme } = useContext(ThemeContext);
  const [themeWithAuto, setThemeWithAuto] = useState(getDefaultTheme());
  const { t } = useTranslation();
  const handleChange = (e: any) => {
    const newTheme = e.target.value as `${THEME}`;
    setThemeWithAuto(newTheme);
    storage.setItem(STORAGE_THEME_KEY, newTheme);
    toggleTheme(normalizeTheme(newTheme));
  };

  return (
    <Select
      selectedKeys={[themeWithAuto]}
      className="w-[180px]"
      aria-label={t("setting.theme")}
      placeholder={t("setting.theme_placeholder")}
      onChange={handleChange}>
      {themeList.map(t => (
        <SelectItem key={t} value={t}>{t}</SelectItem>
      ))}
    </Select>
  );
}

export default ThemeSwitch;
