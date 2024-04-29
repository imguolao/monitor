import { useTranslation } from 'react-i18next';
import Card from "@/components/card/Card";
import LanguageSwitch from '@/components/setting/LanguageSwitch';
import ThemeSwitch from '@/components/setting/ThemeSwitch';

function SettingPanel() {
  const { t } = useTranslation();
  return (
    <Card title={t("setting.panel_title")}>
      <LanguageSwitch />
      <ThemeSwitch />
    </Card>
  );
}

export default SettingPanel;
