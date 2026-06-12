import type { PropsWithChildren } from "react";
import { ControlPanelProvider } from "../context/ControlPanel/ControlPanelProvider";

// Note: Initially, I had several ideas on how to control and what to do for this demo,
// and in the process I had several providers
// and in general I had encountered many nested providers before,
// and there is nothing wrong with how it looks,
// but I decided to demonstrate my view on this through this implementation
const providers = [
  ControlPanelProvider,
];

export const AppProviders = ({ children }: PropsWithChildren) =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children,
  );
