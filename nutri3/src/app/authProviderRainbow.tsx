"use client";
import { wagmiconfig } from "@/lib/wagmiconfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia, baseSepolia, arbitrumSepolia} from "wagmi/chains";

const config = getDefaultConfig({
  appName: "nutri3",
  projectId: "9faf3e3a0f9dc0274e3b24b094dcfc3b",
  chains: [sepolia, baseSepolia, arbitrumSepolia],
  //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export const AuthProviderRainbowKit = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};