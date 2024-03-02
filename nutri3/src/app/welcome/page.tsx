"use client"

import * as React from 'react' 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { wagmiAbi } from '@/abi/member';

import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { baseSepolia } from "viem/chains";

const Welcome = () => {

  const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: custom(window.ethereum!)
  })

  const ProceessMembershipRequest = async () => {
    const [account] = await walletClient.getAddresses();

    await walletClient.writeContract({
      address: "0xddB6BA183a73a6418eDa8a0feb812ED57116Aa3e",
      abi: wagmiAbi,
      functionName: 'registerMember',
      account: account,
      chain: baseSepolia
    }).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });

  };


  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="space-y-4 w-full max-w-sm">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-3xl font-bold">
                  Join the Community
                </CardTitle>
                <CardDescription>
                  Click the Button below to join the community. You will recieve
                  a gift as confirmation.
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-6">
                {/* <Link href="/welcome/success/1">
                  <Button className="w-full">Join Community</Button>
                </Link> */}
                <Button className="w-full" onClick={ () => ProceessMembershipRequest()}>Join Community</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
