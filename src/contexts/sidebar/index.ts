import { createContext } from "react";

export type SidebarContextValue = {
  selectedKey: string;
  toggleSelectedKey: (key: string) => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  selectedKey: '',
  toggleSelectedKey: () => {},
});
