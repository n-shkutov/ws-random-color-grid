import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import { wsClient } from "../../services/wsClient";
import { ControlPanelContext } from "./ControlPanelContext";
import type { ControlPanelContextProps } from "../../shared/types";

export const ControlPanelProvider = ({ children }: PropsWithChildren) => {
  const [speed, setSpeed] = useState(1);
  const [amount, setAmount] = useState(4);
  const [gap, setGap] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const onStart = () => {
    wsClient.start({ amount, speed });
    setIsRunning(true);

    // I tested it on my phone and it seemed to me
    // that vibration would give interesting feedback here,
    // but it is not necessarily necessary.
    navigator.vibrate(100);
  };

  const onStop = () => {
    wsClient.stop();
    setIsRunning(false);
    navigator.vibrate(100);
  };

  useEffect(() => {
    wsClient.updateSettings({ speed, amount });
  }, [speed, amount]);

  useEffect(() => {
    const onConnect = () => setIsOnline(true);
    const onDisconnect = () => setIsOnline(false);

    wsClient.on("connect", onConnect);
    wsClient.on("disconnect", onDisconnect);

    return () => {
      wsClient.off("connect", onConnect);
      wsClient.off("disconnect", onDisconnect);
    };
  }, []);

  const value = useMemo<ControlPanelContextProps>(() => ({
    isOnline,
    isRunning,
    amount,
    speed,
    gap,
    onStart,
    onStop,
    onAmountChange: setAmount,
    onSpeedChange: setSpeed,
    onGapChange: setGap,
  }), [amount, speed, isRunning, gap, isOnline]);

  return (
    <ControlPanelContext
      value={value}
    >
      {children}
    </ControlPanelContext>
  );
};
