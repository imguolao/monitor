import { useTranslation } from 'react-i18next';
import Card from "@/components/card/Card";
import Field from "@/components/field/Field";
import LanguageSwitch from '@/components/setting/LanguageSwitch';
import ThemeSwitch from '@/components/setting/ThemeSwitch';

function SettingPanel() {
  const { t } = useTranslation();
  return (
    <Card title={t("setting.panel_title")}>
      <Field label={t("setting.language")} className="mb-[16px]">
        <LanguageSwitch />
      </Field>
      <Field label={t("setting.theme")}>
        <ThemeSwitch />
      </Field>
    </Card>
  );
}

export default SettingPanel;
