import { type ReactNode, useContext } from "react";
import { SidebarContext } from "@/contexts/sidebar";

export type SidebarItem = {
  key: string;
  label: string;
  icon: ReactNode;
}

function Sidebar(props: { list: SidebarItem[] }) {
  const { selectedKey, toggleSelectedKey } = useContext(SidebarContext);
  const handleClick = (key: string) => {
    toggleSelectedKey(key);
  }

  return (
    <div className="h-full pl-[20px]">
      {props?.list?.map(({ key, label, icon }) => (
        <div
          key={key}
          onClick={() => handleClick(key)}
          className={`
            h-[40px] rounded-[8px] box-border 
            relative py-[8px] [&:not(:last-child)]:mb-[16px]
            hover:dark:bg-default-300 hover:bg-default-300
            ${selectedKey === key ? "dark:bg-default-300 bg-default-300" : ""}
        `}>
          {selectedKey === key &&
            <div className="
              h-[24px] w-[0px] border-l-[4px] border-solid absolute
              dark:border-primary-700 border-primary-700
            "></div>
          }
          <div className="h-full ml-[12px] flex items-center">
            {icon}
            <span className="pl-[6px] font-medium select-none">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
