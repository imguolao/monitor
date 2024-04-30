import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "@nextui-org/react";
import { LANGUAGE } from "@/i18n/locales";
import { getLanguage, STORAGE_LANGUAGE_KEY } from "@/utils/i18n";
import { storage } from "@/utils/storage";

const lngList = Object.keys(LANGUAGE);

function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const [currLng, setCurrLng] = useState<`${LANGUAGE}`>(getLanguage());
  const handleChange = (e: any) => {
    const lng = e.target.value;
    setCurrLng(lng);
    storage.setItem(STORAGE_LANGUAGE_KEY, lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      selectedKeys={[currLng]}
      className="w-[160px]"
      aria-label={t("setting.language")}
      placeholder={t("setting.language_placeholder")}
      onChange={handleChange}>
      {lngList.map(lng => (
          <SelectItem key={lng} value={lng}>{lng}</SelectItem>
      ))}
    </Select>
  );
}

export default LanguageSwitch;
