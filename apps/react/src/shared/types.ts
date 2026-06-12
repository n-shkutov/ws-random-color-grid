export type Color = string;
export type Listener = (color: Color) => void;

export type ControlPanelContextProps = {
  isRunning: boolean;
  isOnline: boolean;
  speed: number;
  amount: number;
  gap: number;
  onSpeedChange: (value: number) => void;
  onAmountChange: (value: number) => void;
  onGapChange: (value: number) => void;
  onStart: () => void;
  onStop: () => void;
};
