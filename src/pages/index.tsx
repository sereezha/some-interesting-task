import Head from 'next/head';
import GameStateLayout from '@/components/GameStateLayout/GameStateLayout';
import { GameActionCreator, useGameContext } from '@/context/GameProvider';
import { useEffect } from 'react';
import { AppRoute } from '@/constants/route';

export default function Home() {
  const { dispatch } = useGameContext();

  useEffect(() => {
    dispatch(GameActionCreator.resetGame());
  }, [dispatch]);

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
