import classes from "@app/styles/ControlPanel.module.css";
import { useControlPanelContext } from "../context/ControlPanel/useControlPanelContext";
import { StatusArea } from "./StatusArea";

const speedId = "speed";
const amountId = "amount";
const gapId = "gap";

export const ControlPanel = () => {
  const {
    amount,
    speed,
    gap,
    onAmountChange,
    onSpeedChange,
    onGapChange,
    onStart,
    onStop,
    isRunning,
    isOnline,
  } = useControlPanelContext();

  return (
    <div className={classes.controlPanel}>
      <fieldset>
        <legend>
          Controls -{" "}
          <StatusArea
            text={isOnline ? "Online" : "Offline"}
            state={isOnline ? "positive" : "negative"}
          />
        </legend>

        <button
          type="button"
          onClick={onStart}
          disabled={!isOnline || isRunning}
        >
          Start
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!isOnline || !isRunning}
        >
          Stop
        </button>

        <label htmlFor={speedId}>
          Speed: {speed}
        </label>
        <input
          id={speedId}
          type="range"
          min={1}
          max={1000}
          value={speed}
          onChange={(event) => onSpeedChange?.(Number(event.target.value))}
          disabled={!isOnline}
        />

        <label htmlFor={amountId}>
          Elements: {amount}
        </label>
        <input
          id={amountId}
          type="range"
          min={4}
          max={800}
          step={4}
          value={amount}
          onChange={(event) => onAmountChange?.(Number(event.target.value))}
          disabled={!isOnline}
        />

        <label htmlFor={gapId}>
          Gap: {gap}
        </label>
        <input
          id={gapId}
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={gap}
          onChange={(event) => onGapChange?.(Number(event.target.value))}
          disabled={!isOnline}
        />
      </fieldset>
    </div>
  );
};
