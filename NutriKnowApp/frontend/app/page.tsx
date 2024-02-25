'use client'
import InstructionsComponent from "@/components/instructionsComponent";
import styles from "./page.module.css";
import "./globals.css";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <InstructionsComponent></InstructionsComponent> */}
      <h1>Nutri Know</h1>
      <BarcodeScanner />
    </main>
  );
}
