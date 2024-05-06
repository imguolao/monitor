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
      icon: (<BrightnessIcon />),
    },
    {
      key: "setting",
      label: t("setting.sidebar_label"),
      icon: (<SettingIcon />),
    }
  ];

  return (
    <SidebarContext.Provider value={{
      selectedKey: sidebarKey,
      toggleSelectedKey: setSidebarKey,
    }}>
      <div className="flex h-full dark:bg-default-50 bg-default-50">
        <Sidebar list={sideList} />
        <section className="flex-1 px-[20px]">
          {currPanel}
        </section>
      </div>
    </SidebarContext.Provider>
  );
}

export default Home;
