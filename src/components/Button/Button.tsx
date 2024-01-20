import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

const Button: React.FC<Props> = ({
  children,
  href,
  fullWidth = false,
  type = 'button',
  ...delegated
}) => {
  const classes = clsx(styles.btn, {
    [styles.fullWidth]: fullWidth,
  });

  if (href) {
    return (
      <Link
        href={href}
        className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      {...delegated}
      className={classes}
      // eslint-disable-next-line react/button-has-type
      type={type}>
      {children}
    </button>
  );
};

export default Button;
