import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import Button from '../Button/Button';
import styles from './GameStateLayout.module.scss';
import Container from '../Container/Container';

interface Props {
  title: string;
  subtitle?: string;
  button: {
    content: React.ReactNode;
    href?: string;
    onClick?: () => void;
  };
  type?: 'start' | 'end';
}

function GameStateLayout(props: Props) {
  const { button, title, type = 'start', subtitle } = props;
  const containerClasses = clsx(styles.container, styles[type]);

  return (
    <div>
      <Container className={containerClasses}>
        <Image
          className={styles.image}
          src='/img/thumbs-up.png'
          alt=''
          width={452}
          height={375}
          priority
        />
        <div className={styles.content}>
          <div className={styles.titleWrap}>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <h1 className={styles.title}>{title}</h1>
          </div>
          <div className={styles.button}>
            <Button
              href={button.href}
              onClick={button.onClick}>
              {button.content}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default GameStateLayout;
