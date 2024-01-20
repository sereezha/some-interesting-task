import React from 'react';
import clsx from 'clsx';
import AnswerBoxDesktop from '@/assets/answer-desktop.svg';
import AnswerBoxMobile from '@/assets/answer-mobile.svg';
import EarnedBoxDesktop from '@/assets/earned-box-desktop.svg';
import EarnedBoxMobile from '@/assets/earned-box-mobile.svg';
import styles from './Hexagon.module.scss';

type Box = 'answer' | 'earn';

const getBox = (type: Box) => {
  const mapper = {
    earn: {
      desktop: <EarnedBoxDesktop />,
      mobile: <EarnedBoxMobile />,
    },
    answer: {
      desktop: <AnswerBoxDesktop />,
      mobile: <AnswerBoxMobile />,
    },
    default: {
      desktop: <EarnedBoxDesktop />,
      mobile: <EarnedBoxMobile />,
    },
  };

  return mapper[type] || mapper['default'];
};

interface Props {
  type?: Box;
  className?: string;
}

const Hexagon: React.FC<Props> = ({ type = 'earn', className }) => {
  const { desktop, mobile } = getBox(type);

  return (
    <>
      <span className={clsx(styles.box, styles.boxDesktop, className)}>
        {desktop}
      </span>
      <span className={clsx(styles.box, styles.boxMobile, className)}>
        {mobile}
      </span>
    </>
  );
};

export default Hexagon;
