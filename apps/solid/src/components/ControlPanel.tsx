import { createEffect, on, Show } from "solid-js";
import {
  isRunning,
  setIsRunning,
  setSettings,
  settings,
} from "../store/settings";
import { wsClient } from "../services/wsClient";
import { gap, setGap } from "../store/gap";
import { online } from "../store/online";
import { StatusArea } from "./StatusArea";
import classes from "@app/styles/ControlPanel.module.css";

const speedId = "speed";
const amountId = "amount";
const gapId = "gap";

export const ControlPanel = () => {
  const onStart = () => {
    setIsRunning(true);
    wsClient.start(settings);

    navigator.vibrate(100);
  };

  const onStop = () => {
    setIsRunning(false);
    wsClient.stop();

    navigator.vibrate(100);
  };

  createEffect(() => {
    if (!online() && isRunning()) {
      setIsRunning(false);
    }
  });

  createEffect(
    on(
      [
        () => settings.amount,
        () => settings.speed,
        () => gap(),
      ],
      () => {
        navigator.vibrate(100);
      },
      { defer: true },
    ),
  );

  return (
    <div class={classes.controlPanel}>
      <fieldset>
        <legend>
          Controls -{" "}
          <Show
            when={online()}
            fallback={<StatusArea text="Offline" state="negative" />}
          >
            <StatusArea text="Online" state="positive" />
          </Show>
        </legend>

        <button
          type="button"
          onClick={onStart}
          disabled={!online() || isRunning()}
        >
          Start
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!online() || !isRunning()}
        >
          Stop
        </button>

        <label for={speedId}>
          Speed: {settings.speed}
        </label>
        <input
          id={speedId}
          type="range"
          min={1}
          max={1000}
          value={settings.speed}
          onInput={(event) => setSettings("speed", event.target.valueAsNumber)}
          disabled={!online()}
        />

        <label for={amountId}>
          Elements: {settings.amount}
        </label>
        <input
          id={amountId}
          type="range"
          min={4}
          max={800}
          step={4}
          value={settings.amount}
          onInput={(event) => setSettings("amount", event.target.valueAsNumber)}
          disabled={!online()}
        />

        <label for={gapId}>
          Gap: {gap()}
        </label>
        <input
          id={gapId}
          type="range"
          min={0}
          max={5}
          step={0.1}
          value={gap()}
          onInput={(event) => setGap(event.target.valueAsNumber)}
          disabled={!online()}
        />
      </fieldset>
    </div>
  );
};
