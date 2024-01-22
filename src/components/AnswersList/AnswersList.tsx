import React from 'react';
import { useRouter } from 'next/navigation';
import { sleep } from '@/utils/common';
import clsx from 'clsx';
import { AppRoute } from '@/constants/route';
import { IAnswer, AnswerState } from '@/types/game';
import { useGameContext, GameActionCreator } from '@/context/game';
import styles from './AnswersList.module.scss';
import Answer from './components/Answer';

interface Props {}

const AnswersList: React.FC<Props> = () => {
  const router = useRouter();
  const {
    state: { answerState, selectedAnswer, question },
    dispatch,
  } = useGameContext();

  const handleAnswerClick = async (answer: IAnswer) => {
    dispatch(GameActionCreator.setAnswer(answer));

    await sleep(3000);

    dispatch(
      GameActionCreator.setAnswerState(
        answer.isCorrect ? AnswerState.CORRECT : AnswerState.WRONG
      )
    );

    await sleep(1000);

    if (answer.isCorrect) {
      dispatch(GameActionCreator.moveToNextQuestion());
    } else {
      dispatch(GameActionCreator.gameOver());
      router.replace(AppRoute.GAME_OVER.path);
    }
  };

  return (
    <ul className={styles.answers}>
      {question?.answers.map((answer) => (
        <li
          key={answer.id}
          className={clsx(styles.answer, {
            [styles.disabled]: answerState !== AnswerState.IDLE,
          })}>
          <Answer
            state={selectedAnswer?.id === answer.id ? answerState : undefined}
            onClick={() => handleAnswerClick(answer)}>
            {answer.text}
          </Answer>
        </li>
      ))}
    </ul>
  );
};

export default AnswersList;
