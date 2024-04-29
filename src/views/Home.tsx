import { useTranslation } from 'react-i18next';
import { Button } from "@nextui-org/react";
import LanguageSwitch from '@/components/setting/LanguageSwitch';
import ThemeSwitch from '@/components/setting/ThemeSwitch';

function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Button>{t("welcome")}</Button>
      <LanguageSwitch />
      <ThemeSwitch />
    </>
  );
}

export default Home;
