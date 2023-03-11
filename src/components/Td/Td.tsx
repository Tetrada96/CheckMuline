import React from 'react';
import cn from 'classnames';

import styles from './Td.module.scss';

export const Td = ({ children, style }: { children?: string | JSX.Element; style?: React.CSSProperties }) => {
  return (
    <td style={style} className={cn(styles.td)}>
      {children}
    </td>
  );
};
