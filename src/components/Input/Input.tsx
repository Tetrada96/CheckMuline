import React from 'react';

import styles from './Input.module.scss';

interface IInputProps {
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id?: string) => void;
}

export const Input = ({ value, type = 'text', onChange }: IInputProps) => {
  return <input type={type} className={styles.input} value={value} onChange={onChange} />;
};
