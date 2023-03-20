import React from 'react';
import classNames from 'classnames';

import styles from './Td.module.scss';

export const Td = ({
  children,
  className,
  style,
}: {
  children?: string | JSX.Element;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <td style={style} className={classNames(styles.td, className)}>
      {children}
    </td>
  );
};
