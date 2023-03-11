import React from 'react';

import styles from './Tr.module.scss';

export const Tr = ({ children }: { children: JSX.Element[] }) => {
  return (
    <tr className={styles.Tr} style={{ backgroundColor: 'white' }}>
      {children}
    </tr>
  );
};
