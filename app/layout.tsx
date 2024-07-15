import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import {
  WagmiProvider,
  config,
  QueryClientProvider,
  RainbowKitProvider,
  queryClient,
} from "../constants/imports";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ticketsPlug",
  description: "Get tickets for any & every event happening in the country",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
