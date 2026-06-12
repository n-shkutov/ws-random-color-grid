import { AppProviders } from "./AppProviders/AppProviders";
import { ControlPanel } from "./components/ControlPanel";
import { Grid } from "./components/Grid";
import { useWsClient } from "./hooks/useWsClient";
import classes from "@app/styles/App.module.css";

export const App = () => {
  useWsClient();

  return (
    <AppProviders>
      <div className={classes.app}>
        <ControlPanel />
        <Grid />
      </div>
    </AppProviders>
  );
};
