import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);

export default Container;
