"use client";
//import { wagmiconfig } from "@/lib/wagmiconfig";
//import { WagmiProvider } from "wagmi";
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { baseSepolia , arbitrumSepolia} from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';

import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from '@zerodev/wagmi/rainbowkit'

import {
  argentWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

//import { connectorsForWallets } from '@rainbow-me/rainbowkit'

//import {PrivyProvider} from '@privy-io/react-auth';
//import type {PrivyClientConfig} from '@privy-io/react-auth';

import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'

// const config = getDefaultConfig({
//   appName: "nutri3",
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
//   chains: [baseSepolia, arbitrumSepolia],
//   //ssr: true, // If your dApp uses server side rendering (SSR)
// });

const allowedChains = [baseSepolia, arbitrumSepolia];
const connectors = connectorsForWallets([
  {
    groupName: 'Social',
    wallets: [
      googleWallet({chains: allowedChains, options: { projectId: "2ff876ad-4039-44f2-8543-4dc3745f6e4f" }}),
      metaMaskWallet({ chains: allowedChains, projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string }),
    ],
  },
]);

//const queryClient = new QueryClient();
// const privyConfig: PrivyClientConfig = {
//   embeddedWallets: {
//     createOnLogin: 'users-without-wallets',
//     requireUserPasswordOnCreate: true,
//     noPromptOnSignature: false,
//   },
//   loginMethods: ['wallet', 'email', 'sms', 'google', 'farcaster'],
//   appearance: {
//     showWalletLoginFirst: false,
//   },
// };

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    baseSepolia,
    arbitrumSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [baseSepolia] : []),
  ],
  [ alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''}),
    publicProvider()
  ]
);


const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
  //   <QueryClientProvider client={queryClient}>
  //   <WagmiProvider config={wagmiConfig}>
  //     <RainbowKitProvider chains={allowedChains}>{children}</RainbowKitProvider>
  //   </WagmiProvider>
  // </QueryClientProvider>    
      <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={allowedChains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
