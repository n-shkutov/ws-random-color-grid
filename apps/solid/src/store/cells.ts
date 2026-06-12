import { CellDataPayload } from "@app/contracts";
import { createStore } from "solid-js/store";

const [cells, setCellsState] = createStore<
  Record<CellDataPayload["index"], CellDataPayload["color"]>
>({});

const emmitCellData = (index: number, color: string) => {
  setCellsState(index, color);
};

const resetCellsToInitial = () => {
  setCellsState({});
};

export { cells, emmitCellData, resetCellsToInitial };
