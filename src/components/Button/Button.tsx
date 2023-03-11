import React from 'react';

import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({ text, disabled, onClick }: IButtonProps) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
