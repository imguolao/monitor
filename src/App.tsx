import { useTranslation } from 'react-i18next';
import { NextUIProvider, Button } from "@nextui-org/react";

function App() {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage('zh_CN');
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Button>{t("welcome")}</Button>
      </main>
    </NextUIProvider>
  );
}

export default App;
