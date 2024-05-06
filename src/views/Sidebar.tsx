import { type ReactNode, useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/contexts/sidebar";
import { isNumber } from "@/utils";

const WINDOW_WIDTH = 648;

export type SidebarItem = {
  key: string;
  label: string;
  icon: ReactNode;
}

function Sidebar(props: { list: SidebarItem[] }) {
  const { selectedKey, toggleSelectedKey } = useContext(SidebarContext);
  const [visiable, setVisiable] = useState(window.innerWidth >= WINDOW_WIDTH);
  const handleClick = (key: string) => toggleSelectedKey(key);

  useEffect(() => {
    const handleResize = (ev: Event) => {
      const width = (ev?.target as Window | null)?.innerWidth;
      if (isNumber(width)) {
        setVisiable(width >= WINDOW_WIDTH);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`
        ${visiable ? "w-[260px]" : "w-[48px] overflow-hidden"}
        ease-in-out duration-200 transition-width
        h-full grow-0 shrink-0 dark:bg-default-100 bg-default-100
      `}>
      {props?.list?.map(({ key, label, icon }) => (
        <div
          key={key}
          onClick={() => handleClick(key)}
          className={`
            h-[40px] box-border relative py-[8px] [&:not(:last-child)]:mb-[8px]
            hover:dark:bg-default-200 hover:bg-default-200
            ${selectedKey === key ? "dark:bg-default-200 bg-default-200" : ""}
        `}>
          {selectedKey === key &&
            <div className="
              h-[24px] w-[0px] border-l-[4px] border-solid absolute
              dark:border-primary-500 border-primary-500
            "></div>
          }
          <div className="h-full mx-[12px] flex items-center">
            <i className="text-[24px] mr-[12px]" title={label}>{icon}</i>
            <span className="font-medium select-none">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
