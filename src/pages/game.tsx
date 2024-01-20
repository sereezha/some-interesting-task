import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { useGameContext } from '@/context/game/GameProvider';
import AnswersList from '@/components/AnswersList/AnswersList';
import EarnedList from '@/components/EarnedList/EarnedList';
import Menu from '@/assets/menu.svg';
import Close from '@/assets/close.svg';
import styles from '@/styles/game.module.scss';
import { AppRoute } from '@/constants/route';
import { useRouter } from 'next/router';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

const Game: React.FC = () => {
  const [isEarnedVisible, setIsEarnedVisible] = useState(false);
  const {
    state: { currentQuestion, question, questions, prizes },
  } = useGameContext();
  const router = useRouter();

  useEffect(() => {
    if (currentQuestion > questions.length && questions.length > 0) {
      router.push(AppRoute.GAME_OVER.path);
    }
  }, [currentQuestion, questions.length, router]);

  const handleEarnedVisibility = () => {
    setIsEarnedVisible((prev) => !prev);
  };

  useLockBodyScroll(isEarnedVisible);

  const earnedList = (
    <EarnedList
      prizes={prizes}
      currentQuestion={currentQuestion}
    />
  );

  return (
    <>
      <Head>
        <title>Who wants to be a millionaire?</title>
      </Head>
      <main className={styles.page}>
        <div
          className={clsx(styles.earned, styles.earnedMobile, {
            [styles.visible]: isEarnedVisible,
          })}>
          {earnedList}
        </div>
        <button
          className={styles.burger}
          type='button'
          onClick={handleEarnedVisibility}>
          {isEarnedVisible ? <Close /> : <Menu />}
        </button>
        <div className={styles.content}>
          <h1 className={styles.question}>{question?.text}</h1>
          <AnswersList />
        </div>
        <div className={clsx(styles.earned, styles.earnedDesktop)}>
          {earnedList}
        </div>
      </main>
    </>
  );
};

export default Game;
