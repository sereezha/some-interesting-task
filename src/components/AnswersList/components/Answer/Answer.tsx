import clsx from 'clsx';
import React from 'react';
import { AnswerState } from '@/types/game';
import Hexagon from '@/components/Hexagon';
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
      <Hexagon
        type='answer'
        className={styles.box}
      />
      <span className={styles.content}>
        <span className={styles.contentText}>{children}</span>
      </span>
    </button>
  );
};

export default Answer;
