import { useEffect, useRef } from "react";
import { getCurrent } from "@tauri-apps/api/window";
import MinimizeIcon from "@/components/icon/Minimize";
import MaximizeIcon from "@/components/icon/Maximize";
import CloseIcon from "@/components/icon/Close";

function Titlebar() {
  const miniIconRef = useRef<HTMLDivElement>(null);
  const maxIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const appWindow = getCurrent();
      const minimize = () => appWindow.minimize();
      miniIconRef.current?.addEventListener("click", minimize);

      const maxmize = () => appWindow.maximize();
      maxIconRef.current?.addEventListener("click", maxmize);

      const close = () => appWindow.close();
      closeIconRef.current?.addEventListener("click", close);

      return () => {
        miniIconRef.current?.removeEventListener("click", minimize);
        maxIconRef.current?.removeEventListener("click", maxmize);
        closeIconRef.current?.removeEventListener("click", close);
      };
  }, []);

  return (
    <div 
      data-tauri-drag-region
      className="
        h-[32px] flex justify-between select-none 
        fixed top-0 left-0 right-0 
        dark:bg-default-100 bg-default-100
      ">
      <h1 className="select-none pointer-events-none">Monitor</h1>
      <div className="flex">
        <div
          ref={miniIconRef}
          className="
            inline-flex justify-center items-center select-none 
            text-[18px] w-[46px] hover:dark:bg-default-50 hover:bg-default-100
          ">
          <MinimizeIcon />
        </div>
        <div
          ref={maxIconRef}
          className="
          inline-flex justify-center items-center select-none
          text-[18px] w-[46px] hover:dark:bg-default-50 hover:bg-default-100
        ">
          <MaximizeIcon />
        </div>
        <div
          ref={closeIconRef}
          className="
          inline-flex justify-center items-center select-none
          text-[18px] w-[46px] hover:bg-[#d10f20]
        ">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
