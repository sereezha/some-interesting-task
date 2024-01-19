import React from 'react';
import { useRouter } from 'next/navigation';
import { GameActionCreator, useGameContext } from '@/context/GameProvider';
import { sleep } from '@/utils';
import clsx from 'clsx';
import { AnswerState, IAnswer } from '@/types';
import { AppRoute } from '@/constants/route';
import Answer from './components/Answer/Answer';
import styles from './AnswersList.module.scss';

interface Props {}

const AnswersList: React.FC<Props> = () => {
  const router = useRouter();
  const {
    state: { answerState, selectedAnswer, question, currentQuestion },
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

    if (answer.isCorrect && currentQuestion !== 12) {
      dispatch(GameActionCreator.moveToNextQuestion());
    } else {
      router.push(AppRoute.GAME_OVER.path);
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
