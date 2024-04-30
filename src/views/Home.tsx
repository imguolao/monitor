import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar, { type SidebarItem } from "./Sidebar";
import BrightnessIcon from "@/components/icon/Brightness";
import SettingIcon from "@/components/icon/Setting";
import SettingPanel from "./SettingPanel";
import { SidebarContext } from "@/contexts/sidebar";
import BrightnessPanel from "./BrightnessPanel";

function Panel(props: { panelKey: string }) {
  switch (props.panelKey) {
    case "brightness":
      return (<BrightnessPanel />);
    
    case "setting":
      return (<SettingPanel />);

    default:
      return null;
  }
}

function Home() {
  const [sidebarKey, setSidebarKey] = useState<string>("brightness");
  const { t } = useTranslation();
  const currPanel = useMemo(() => (<Panel panelKey={sidebarKey} />), [sidebarKey]);
  const sideList: SidebarItem[] = [
    {
      key: "brightness",
      label: t("brightness.sidebar_label"),
      icon: (<BrightnessIcon className="text-[24px]" />),
    },
    {
      key: "setting",
      label: t("setting.sidebar_label"),
      icon: (<SettingIcon className="text-[24px]" />),
    }
  ];

  return (
    <SidebarContext.Provider value={{
      selectedKey: sidebarKey,
      toggleSelectedKey: setSidebarKey,
    }}>
      <div className="flex h-full dark:bg-default-100 bg-default-100">
        <div className="basis-[320px] h-full">
          <Sidebar list={sideList} />
        </div>
        <section className="flex-1 px-[20px]">
          {currPanel}
        </section>
      </div>
    </SidebarContext.Provider>
  );
}

export default Home;
