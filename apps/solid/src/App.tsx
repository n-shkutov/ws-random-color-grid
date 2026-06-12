import classes from "@app/styles/App.module.css";
import { ControlPanel } from "./components/ControlPanel";
import { Grid } from "./components/Grid";
import { wsClient } from "./services/wsClient";
import { createEffect, onCleanup, onMount } from "solid-js";
import { settings } from "./store/settings";

export const App = () => {
  createEffect(() => {
    wsClient.updateSettings({ amount: settings.amount, speed: settings.speed });
  });
  onMount(() => wsClient.connect());
  onCleanup(() => wsClient.disconnect());

  return (
    <div class={classes.app}>
      <ControlPanel />
      <Grid />
    </div>
  );
};
