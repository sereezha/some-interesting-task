import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { GameActionCreator, useGameContext } from '@/context/GameProvider';
import AnswersList from '@/components/AnswersList/AnswersList';
import EarnedList from '@/components/EarnedList/EarnedList';
import Menu from '../assets/Menu.svg';
import Close from '../assets/Close.svg';
import styles from '../styles/game.module.scss';

interface Props {}

const Game: React.FC<Props> = () => {
  const [isEarnedVisible, setIsEarnedVisible] = useState(false);
  const {
    state: { currentQuestion, question, questions, hashMapPrizes, prizes },
    dispatch,
  } = useGameContext();

  useEffect(() => {
    dispatch(GameActionCreator.setNextQuestion(questions[currentQuestion - 1]));
  }, [currentQuestion, dispatch, questions]);

  const handleEarnedVisibility = () => {
    setIsEarnedVisible((prev) => !prev);
  };

  useEffect(() => {
    if (currentQuestion > 1) {
      const earned = hashMapPrizes[currentQuestion - 1]!.amount;
      dispatch(GameActionCreator.setEarned(earned));
    }
  }, [currentQuestion, hashMapPrizes, dispatch]);

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
