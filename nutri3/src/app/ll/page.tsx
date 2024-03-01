import Image from "next/image";
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
import "@rainbow-me/rainbowkit/styles.css";

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
} from "@rainbow-me/rainbowkit/wallets";

export default function Ll() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
    <div className="flex flex-col justify-center items-center space-y-4 w-full max-w-sm min-h-screen py-12 px-4">
      <p>Call me</p>
      <Input id="Ll" placeholder="Ll input dies das" type="email" />
      <Button className="w-full">Call LL</Button>
    </div>
    </div>
  );
}
