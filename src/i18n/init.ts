import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLanguage } from "@/utils/i18n";
import { resources } from "./locales";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguage(),
    fallbackLng: "en",
    // debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  });
