import { useRef, useSyncExternalStore } from "react";
import { dataEmitter } from "../services/dataEmitter";
import type { Color } from "../shared/types";

export const useCellData = (index: number) => {
  const snapshotRef = useRef<Color>(null);

  return useSyncExternalStore(
    (onStoreChange) =>
      dataEmitter.subscribe(index, (color: Color) => {
        snapshotRef.current = color;
        onStoreChange();
      }),
    () => snapshotRef.current,
  );
};
