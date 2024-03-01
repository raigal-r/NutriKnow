"use client";
import { wagmiconfig } from "@/lib/wagmiconfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "nutri3",
  projectId: "9faf3e3a0f9dc0274e3b24b094dcfc3b",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
