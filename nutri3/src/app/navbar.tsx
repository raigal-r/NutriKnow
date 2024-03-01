"use client";
import { Button } from "@/components/ui/button";
import "./globals.css";
import Link from "next/link";
//import { ConnectButton } from "@rainbow-me/rainbowkit";

import {useAccount, useDisconnect} from 'wagmi';
import {useSetActiveWallet} from '@privy-io/wagmi';
import {usePrivy, useWallets} from '@privy-io/react-auth';
import { shorten } from "./utils";

const MonoLabel = ({label}: {label: string}) => {
  return <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">{label}</span>;
};

export const Navbar = () => {

  // Privy hooks
  const {ready, user, authenticated, login, connectWallet, logout, linkWallet} = usePrivy();
  const {wallets} = useWallets();
  // WAGMI hooks
  const {address, isConnected, isConnecting, isDisconnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {setActiveWallet} = useSetActiveWallet();

  return (
    <header className="flex items-center h-14 px-4 border-b bg-white w-full shrink-0 dark:bg-gray-950">
      <Link
        className="inline-flex items-center font-semibold text-gray-900 dark:text-gray-50"
        href="#"
      >
        Acme Inc
      </Link>
      <nav className="ml-auto flex items-center space-x-4">
        {/* <ConnectButton /> */}
        {ready && !authenticated && (
            <Button onClick={login}>Login</Button>
        )}
        {ready && authenticated && (
            <div
            key={address}
            className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2 bg-slate-50 p-4"
          >
            <div>
              <MonoLabel label={shorten(user?.wallet?.address)} />
            </div>
            {/* <p>User {user?.wallet?.address} is logged in.</p> */}
            <Button onClick={logout}>Logout</Button>
          </div>

        )}
      </nav>
    </header>
  );
};
