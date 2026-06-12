import { useCellData } from "../hooks/useCellData";
import classes from "@app/styles/Cell.module.css";

export const Cell = ({ index }: { index: number }) => {
  const color = useCellData(index);

  const style = {
    backgroundColor: color ? color : "transparent",
  } as React.CSSProperties;

  return (
    <div
      className={classes.cell}
      style={style}
    />
  );
};
