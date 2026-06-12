import classes from "@app/styles/Cell.module.css";
import { cells } from "../store/cells";
import { CellDataPayload } from "@app/contracts";

type Props = Pick<CellDataPayload, "index">;

export const Cell = (props: Props) => (
  <div
    class={classes.cell}
    style={{
      "background-color": cells[props.index] || "transparent",
    }}
  />
);
