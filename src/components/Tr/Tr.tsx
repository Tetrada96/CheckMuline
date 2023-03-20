import React from 'react';
import cn from 'classnames';

import styles from './Tr.module.scss';

export const Tr = ({ children, needBye, isHead }: { children: JSX.Element[]; needBye?: boolean; isHead?: boolean }) => {
  return <tr className={cn(styles.Tr, { [styles.TrNeedBye]: needBye, [styles.TrHead]: isHead })}>{children}</tr>;
};
