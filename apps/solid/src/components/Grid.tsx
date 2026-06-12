import { createMemo, Index } from "solid-js";
import { getGridSize } from "@app/utils";

import { settings } from "../store/settings";
import { Cell } from "./Cell";

import classes from "@app/styles/Grid.module.css";
import { gap } from "../store/gap";

export const Grid = () => {
  const gridSettings = createMemo(() => getGridSize(settings.amount));

  return (
    <div
      class={classes.grid}
      style={{
        "grid-template-columns":
          `repeat(${gridSettings().cols}, minmax(0, 1fr))`,
        "grid-template-rows": `repeat(${gridSettings().rows}, minmax(0, 1fr))`,
        gap: `${gap()}rem`,
      }}
    >
      <Index each={Array.from({ length: settings.amount })}>
        {(_, index) => <Cell index={index} />}
      </Index>
    </div>
  );
};
