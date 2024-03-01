"use client";
import { wagmiconfig } from "@/lib/wagmiconfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { baseSepolia , arbitrumSepolia} from "wagmi/chains";

import {PrivyProvider} from '@privy-io/react-auth';
import type {PrivyClientConfig} from '@privy-io/react-auth';

const config = getDefaultConfig({
  appName: "nutri3",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [baseSepolia, arbitrumSepolia],
  //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ['wallet', 'email', 'sms', 'google', 'farcaster'],
  appearance: {
    showWalletLoginFirst: false,
  },
};

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string} config={privyConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};
