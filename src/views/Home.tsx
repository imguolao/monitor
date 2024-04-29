import { useTranslation } from 'react-i18next';
import LanguageSwitch from '@/components/setting/LanguageSwitch';
import ThemeSwitch from '@/components/setting/ThemeSwitch';
import Sidebar from "./Sidebar";
import BrightnessIcon from "@/components/icon/brightness";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="flex h-full dark:bg-default-100 bg-default-100">
      <div className="basis-[320px] h-full">
        <Sidebar list={[{
          label: t("brightness.label"),
          icon: (<BrightnessIcon className="text-[24px]" />),
        }]} />
      </div>
      <section className="flex-1 px-[20px]">
        <div className="
            h-full box-border rounded-[8px] 
            dark:bg-default-200 bg-background
            border border-solid dark:border-default-100 border-default-200
          ">
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </section>
    </div>
  );
}

export default Home;
