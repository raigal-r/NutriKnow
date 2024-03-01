"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {useAccount, useDisconnect} from 'wagmi';
import {useSetActiveWallet} from '@privy-io/wagmi';
import {usePrivy, useWallets} from '@privy-io/react-auth';



export default function CallToActionSection() {

  const {ready, user, authenticated, login, connectWallet, logout, linkWallet} = usePrivy();
  const {address, isConnected, isConnecting, isDisconnected} = useAccount();

  return (
    <section className="w-full py-2 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-2">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Screen 1</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget justo sodales, ornare justo sit amet, fringilla augue.</p>
          </div>
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-900">

            {ready && !authenticated && (
              <Button onClick={login}>Join Now</Button>
            )}
            {ready && authenticated && (
              <Link href={"/#"}>Go Page 1</Link>
            )}

          </div>
        </div>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 bg-white dark:bg-gray-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Screen 2</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget justo sodales, ornare justo sit amet, fringilla augue.</p>
          </div>
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-900">

            {ready && !authenticated && (
                <Button onClick={login}>Join Now</Button>
              )}
              {ready && authenticated && (
                <Link href={"/#"}>Go Page 2</Link>
              )}

          </div>
        </div>
      </div>
    </section>
  )
}

