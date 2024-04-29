import { ReactNode } from "react";

export type SidebarItem = {
  label: string;
  icon: ReactNode;
}

function Sidebar(props: { list: SidebarItem[] }) {
  return (
    <div className="h-full pl-[20px]">
      {props?.list?.map(({ label, icon }) => (
        <div className="
          h-[40px] rounded-[8px] box-border 
          relative py-[8px]
          dark:bg-default-300 bg-default-300
        ">
          <div className="
            h-[24px] w-[0px] border-l-[4px] border-solid absolute
            dark:border-primary-700 border-primary-700
          "></div>
          <div className="h-full ml-[12px] flex items-center">
            {icon}
            <span className="pl-[6px] font-medium">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
