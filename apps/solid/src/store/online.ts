import { createSignal } from "solid-js";

const [online, setOnline] = createSignal<boolean>(false);

export { online, setOnline };
