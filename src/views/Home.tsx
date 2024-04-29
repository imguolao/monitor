import { useTranslation } from 'react-i18next';
import { Button } from "@nextui-org/react";
import LanguageSwitch from '@/components/setting/LanguageSwitch';

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Button>{t("welcome")}</Button>
      <LanguageSwitch />
    </>
  );
}

export default Home;
