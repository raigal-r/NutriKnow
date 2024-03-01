"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <header className="flex items-center h-14 px-4 border-b bg-white w-full shrink-0 dark:bg-gray-950">
      <Link
        className="inline-flex items-center font-semibold text-gray-900 dark:text-gray-50"
        href="#"
      >
        Acme Inc
      </Link>
      <nav className="ml-auto flex items-center space-x-4">
        <ConnectButton />
      </nav>
    </header>
  );
}
