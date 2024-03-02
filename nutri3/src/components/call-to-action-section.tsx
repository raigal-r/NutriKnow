"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {useAccount, useDisconnect} from 'wagmi';
// import {useSetActiveWallet} from '@privy-io/wagmi';
// import {usePrivy, useWallets} from '@privy-io/react-auth';
import Image from 'next/image';

import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

import { MemberContractAbi } from "@/abi/member-contract-abi";
import { useRouter } from 'next/navigation'


export default function CallToActionSection() {

    //   const {ready, user, authenticated, login, connectWallet, logout, linkWallet} = usePrivy();
    const {address, isConnected, isConnecting, isDisconnected} = useAccount();
    const router = useRouter();

    const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom((window as any).ethereum)
    })

    const MemberProcess = async () => {
        const [account] = await walletClient.getAddresses();
        await walletClient.writeContract({
          address:  process.env.NEXT_PUBLIC_MEMBER_CONTRACT_ADDRESS_SEPOLIA as `0x${string}`,
          abi: MemberContractAbi,   
          functionName: 'registerMember',
          args: [],
          account: account,
          chain: sepolia
        }).then((result) => {
          console.log(result);
          router.push("/welcome");
        }).catch((error) => {
          console.log(error);
        });  
      }    

  return (
    <section>
    <div className="">
        <div className="mx-auto px-6 max-w-6xl text-gray-500">
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-red-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">
                      <h1>
                        User
                      </h1> 
                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p className="text-gray-700 dark:text-gray-300">Check the health score of your food products and get personalized feedback from an AI</p>
                        </div>

                        {/* <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                            <a href="/welcome" className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                                <span>Register</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                            </a>
                        </div> */}

                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                            <a onClick={() => {MemberProcess()}} className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                                <span>Register</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                            </a>
                        </div>


                    </div>
                </div>
                <div className ="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                    <div className="relative">
                          <h1>
                            Nutricionist
                          </h1>                       
                        <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p className="text-gray-700 dark:text-gray-300">Register as a Nutricionist and add to the AI database, get rewards for being a curator</p>
                        </div>

                        <div className="flex gap-3 -mb-8 py-4 border-t border-gray-200 dark:border-gray-800">
                            <a href="/welcome" className="group rounded-xl disabled:border *:select-none [&>*:not(.sr-only)]:relative *:disabled:opacity-20 disabled:text-gray-950 disabled:border-gray-200 disabled:bg-gray-100 dark:disabled:border-gray-800/50 disabled:dark:bg-gray-900 dark:*:disabled:!text-white text-gray-950 bg-gray-100 hover:bg-gray-200/75 active:bg-gray-100 dark:text-white dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-8 px-3.5 justify-center">
                                <span>Register</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    
  );
}  