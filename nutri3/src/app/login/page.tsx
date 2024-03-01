import Image from "next/image";
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import '@rainbow-me/rainbowkit/styles.css';

import { argentWallet, coinbaseWallet, imTokenWallet, injectedWallet, ledgerWallet, metaMaskWallet, omniWallet, rainbowWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <div className="space-y-4 w-full max-w-sm">
        <div className="space-y-2">
          <div className="space-y-2">
            <Card>
              <CardHeader className="p-6">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email address"
                    type="email"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-6">
                <Button className="w-full">Login</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
