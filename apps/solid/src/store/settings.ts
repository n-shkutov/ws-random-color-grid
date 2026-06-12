import { createStore } from "solid-js/store";
import type { Settings } from "@app/contracts";
import { createSignal } from "solid-js";

const [isRunning, setIsRunning] = createSignal<boolean>(false);

const [settings, setSettings] = createStore<
  Settings
>({
  amount: 4,
  speed: 1,
});

export { isRunning, setIsRunning, setSettings, settings };
