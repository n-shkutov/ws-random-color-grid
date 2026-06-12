import { useMemo } from "react";
import { useControlPanelContext } from "../context/ControlPanel/useControlPanelContext";
import { getGridSize } from "@app/utils";
import { Cell } from "./Cell";

import classes from "@app/styles/Grid.module.css";

export const Grid = () => {
  const { amount, gap } = useControlPanelContext();

  const cells = useMemo(
    () =>
      Array.from(
        { length: amount },
        (_, i) => <Cell key={i} index={i} />,
      ),
    [amount],
  );

  const { cols, rows } = getGridSize(amount);

  const style: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    gap: `${gap}rem`,
  };

  return (
    <div
      className={classes.grid}
      style={style}
    >
      {cells}
    </div>
  );
};
