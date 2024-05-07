import { useMemo, useState, type ComponentProps } from "react";
import { useTranslation } from 'react-i18next';
import Sidebar, { type SidebarListItem } from "./Sidebar";
import BrightnessIcon from "@/components/icon/Brightness";
import SettingIcon from "@/components/icon/Setting";
import SettingPanel from "./SettingPanel";
import { SidebarContext } from "@/contexts/sidebar";
import BrightnessPanel from "./BrightnessPanel";
import Titlebar from "@/components/titlebar/Titlebar";

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

function Home(props: ComponentProps<"div">) {
  const [sidebarKey, setSidebarKey] = useState<string>("brightness");
  const { t } = useTranslation();
  const currPanel = useMemo(() => (<Panel panelKey={sidebarKey} />), [sidebarKey]);
  const sideList: SidebarListItem[] = [
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
    <div {...props} className="h-full flex flex-col bg-default-50 dark:bg-background">
      <Titlebar />
      <SidebarContext.Provider value={{
        selectedKey: sidebarKey,
        toggleSelectedKey: setSidebarKey,
      }}>
        <div className="mt-[42px] flex flex-1 overflow-hidden">
          <Sidebar list={sideList} />
          <section className="flex-1 px-[20px] overflow-auto">
            {currPanel}
          </section>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}

export default Home;
