import { useEffect } from "react";
import { wsClient } from "../services/wsClient";

export const useWsClient = () => {
  useEffect(() => {
    wsClient.connect();

    return () => {
      wsClient.disconnect();
    };
  }, []);
};
