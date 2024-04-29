import type { Resource } from "i18next";
import en from './en/translation.json';
import zhCN from './zh_CN/translation.json';

export enum LANGUAGE {
  "en" = "en",
  "zh-CN" = "zh-CN",
}

export const resources: Record<`${LANGUAGE}`, Resource> = {
  en: {
    translation: { ...en },
  },
  "zh-CN": {
    translation: { ...zhCN },
  }
}
