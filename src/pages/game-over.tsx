import Head from 'next/head';
import GameStateLayout from '@/components/GameStateLayout';
import { AppRoute } from '@/constants/route';
import { useGameContext } from '@/context/game';

export default function GameOver() {
  const {
    state: { earned },
  } = useGameContext();

  return (
    <>
      <Head>
        <title>Who wants to be a millionaire?</title>
      </Head>
      <div>
        <GameStateLayout
          type='end'
          subtitle='Total score:'
          title={`$${earned} earned`}
          button={{ content: 'Try again', href: AppRoute.INDEX.path }}
        />
      </div>
    </>
  );
}
