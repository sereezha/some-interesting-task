import clsx from 'clsx';
import React from 'react';
import EarnedBoxDesktop from '@/assets/earned-box-desktop.svg';
import EarnedBoxMobile from '@/assets/earned-box-mobile.svg';
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
      <div className={clsx(styles.box, styles.boxDesktop)}>
        <EarnedBoxDesktop />
      </div>
      <div className={clsx(styles.box, styles.boxMobile)}>
        <EarnedBoxMobile />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Earned;
