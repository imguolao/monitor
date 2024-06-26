import { useEffect, useRef, useState } from "react";
import { type UnlistenFn } from "@tauri-apps/api/event";
import { getCurrent } from "@tauri-apps/api/window";
import MinimizeIcon from "@/components/icon/Minimize";
import MaximizeIcon from "@/components/icon/Maximize";
import CloseIcon from "@/components/icon/Close";
import UnMaximizeIcon from "@/components/icon/Restore";

const ICON_DEFAULT_CLASSES = `
  inline-flex justify-center items-center select-none 
  hover:dark:bg-default-50 hover:bg-default-200
  text-default-500 hover:text-foreground text-[18px] w-[46px]
`;

function Titlebar() {
  const miniIconRef = useRef<HTMLDivElement>(null);
  const maxIconRef = useRef<HTMLDivElement>(null);
  const unMaxIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
      const appWindow = getCurrent();
      const setMaxnizedState = async () => setIsMaximized(await appWindow.isMaximized());

      const minimize = () => appWindow.minimize();
      miniIconRef.current?.addEventListener("click", minimize);

      const maxmize = () => appWindow.maximize();;
      maxIconRef.current?.addEventListener("click", maxmize);

      const close = () => appWindow.close();
      closeIconRef.current?.addEventListener("click", close);

      const unmaximize = () => appWindow.unmaximize();;
      unMaxIconRef?.current?.addEventListener("click", unmaximize);

      let unlisten: UnlistenFn;
      (async () => unlisten = await appWindow.onResized(() => setMaxnizedState()))();
      setMaxnizedState();

      return () => {
        unlisten?.();
        miniIconRef.current?.removeEventListener("click", minimize);
        maxIconRef.current?.removeEventListener("click", maxmize);
        unMaxIconRef?.current?.removeEventListener("click", unmaximize);
        closeIconRef.current?.removeEventListener("click", close);
      };
  }, []);

  return (
    <div 
      data-tauri-drag-region
      className="
        h-[32px] flex justify-between select-none 
        fixed top-0 left-0 right-0
      ">
      <h1 className="select-none pointer-events-none ml-[20px] inline-flex items-center">
        Monitor
      </h1>
      <div className="flex">
        <div
          ref={miniIconRef}
          className={ICON_DEFAULT_CLASSES}>
          <MinimizeIcon />
        </div>
        <div
          ref={maxIconRef}
          className={`${isMaximized ? "hidden" : ""} ${ICON_DEFAULT_CLASSES}`}>
          <MaximizeIcon />
        </div>
        <div
          ref={unMaxIconRef}
          className={`${isMaximized ? "" : "hidden"} ${ICON_DEFAULT_CLASSES}`}>
          <UnMaximizeIcon />
        </div>
        <div
          ref={closeIconRef}
          className="
            inline-flex justify-center items-center select-none
            text-[18px] w-[46px] hover:bg-[#d10f20]
            text-default-500 hover:text-content1 hover:dark:text-foreground
          ">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
