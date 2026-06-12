import { createContext } from "react";
import type { ControlPanelContextProps } from "../../shared/types";

export const ControlPanelContext = createContext<
  ControlPanelContextProps | null
>(null);
