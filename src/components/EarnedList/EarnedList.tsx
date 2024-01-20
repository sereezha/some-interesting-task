import React from 'react';
import { IPrize } from '@/types/game';
import styles from './EarnedList.module.scss';
import Earned from './components/Earned';

interface Props {
  prizes: IPrize[];
  currentQuestion: number;
}

const EarnedList: React.FC<Props> = ({ prizes, currentQuestion }) => (
  <ul className={styles.earnedList}>
    {prizes.map((prize) => (
      <li key={prize.id}>
        <Earned
          isDisabled={currentQuestion > prize.id}
          isActive={prize.id === currentQuestion}>
          ${prize.amount}
        </Earned>
      </li>
    ))}
  </ul>
);

export default EarnedList;
