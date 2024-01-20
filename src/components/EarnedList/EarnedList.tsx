import React from 'react';
import { IPrize } from '@/types/game';
import Earned from './components/Earned/Earned';
import styles from './EarnedList.module.scss';

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
