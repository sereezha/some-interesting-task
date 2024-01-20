import clsx from 'clsx';
import React from 'react';
import AnswerDesktop from '@/assets/answer-desktop.svg';
import AnswerMobile from '@/assets/answer-mobile.svg';
import { AnswerState } from '@/types/game';
import styles from './Answer.module.scss';

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  state?: AnswerState;
}

const Answer: React.FC<Props> = ({
  state = AnswerState.IDLE,
  children,
  ...delegated
}) => {
  const classes = clsx(styles.answer, styles[state]);
  return (
    <button
      {...delegated}
      className={classes}
      type='button'>
      <span className={clsx(styles.box, styles.boxDesktop)}>
        <AnswerDesktop />
      </span>
      <span className={clsx(styles.box, styles.boxMobile)}>
        <AnswerMobile />
      </span>
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Answer;
