import GameProvider from '@/context/game';
import StorageProvider from '@/context/storage';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <StorageProvider>
        <GameProvider>
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        </GameProvider>
      </StorageProvider>
    </>
  );
}
