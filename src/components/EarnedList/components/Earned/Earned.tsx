import clsx from 'clsx';
import React from 'react';
import Hexagon from '@/components/Hexagon';
import styles from './Earned.module.scss';

interface Props {
  children: React.ReactNode;
  isDisabled?: boolean;
  isActive?: boolean;
}

const Earned: React.FC<Props> = ({ children, isDisabled, isActive }) => {
  const classes = clsx(styles.earned, {
    [styles.disabled]: isDisabled,
    [styles.active]: isActive,
  });
  return (
    <div className={classes}>
      <Hexagon className={styles.box} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Earned;
