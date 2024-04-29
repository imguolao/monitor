import { LANGUAGE } from "@/i18n/locales";
import { storage } from "@/utils/storage";

export function getBrowserLanguage(): string | undefined {
  return navigator.language || (navigator as any)?.userLanguage as string | undefined; 
}

export function getLanguage(): `${LANGUAGE}` {
  const lngList = Object.keys(LANGUAGE);
  const localLng = storage.getItem<`${LANGUAGE}`>("language");
  if (localLng && lngList.includes(localLng)) {
    return localLng;
  }

  const browserLng = getBrowserLanguage();
  if (browserLng && lngList.includes(browserLng)) {
    return browserLng as `${LANGUAGE}`;
  }

  return "en";
}