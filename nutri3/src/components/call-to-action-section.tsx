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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Ready to transform your eating habits? Join NutriKnow today and unlock the power of informed food choices! Scan, learn, and enjoy healthier eating with just a tap. Your journey towards a healthier lifestyle begins here. Become part of a community dedicated to wellness.</p>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nutritionists</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Nutritionists, your expertise can shape healthier lives! Partner with NutriKnow to integrate your valuable nutritional guidelines into our AI, helping users make healthier food choices every day. Your knowledge is the key to revolutionizing eating habits.</p><br />
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

