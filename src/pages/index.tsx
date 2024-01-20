import Head from 'next/head';
import GameStateLayout from '@/components/GameStateLayout/GameStateLayout';
import { useGameContext } from '@/context/game/GameProvider';
import { useEffect } from 'react';
import { AppRoute } from '@/constants/route';

export default function Home() {
  const { handleResetGame } = useGameContext();

  useEffect(() => {
    handleResetGame();
  }, [handleResetGame]);

  return (
    <>
      <Head>
        <title>Who wants to be a millionaire?</title>
      </Head>
      <GameStateLayout
        type='start'
        title='Who wants to be a millionaire?'
        button={{ content: 'Start', href: AppRoute.GAME.path }}
      />
    </>
  );
}
