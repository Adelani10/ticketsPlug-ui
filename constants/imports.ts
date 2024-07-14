"use client";

import { MoralisProvider } from "react-moralis";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "ticketsplug-ui",
  projectId: "54cffc50a8cb307500dce8d741293a64",
  chains: [mainnet, polygon],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export {
  MoralisProvider,
  WagmiProvider,
  config,
  QueryClientProvider,
  RainbowKitProvider,
  queryClient
};
