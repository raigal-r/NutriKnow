import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { ThemeButton } from "../components/theme-button"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ThemeButton />
      <br />
      <ConnectButton />
      </div>
  );
};

export default Home;
