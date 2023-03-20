import React from 'react';
import cn from 'classnames';

import styles from './FlexBlock.module.scss';

export const FlexBlock = ({
  style,
  className,
  children,
}: {
  style?: React.CSSProperties;
  className?: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <div className={cn(styles.flexblock, className)} style={style}>
      {children}
    </div>
  );
};
