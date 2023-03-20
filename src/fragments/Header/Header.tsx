import React, { useContext } from 'react';

import styles from './Header.module.scss';
import { FlexBlock } from '../../components/FlexBlock/FlexBlock';
import { Context } from '../..';
import { Button } from '../../components/Button/Button';

export const Header = ({ children }: { children?: JSX.Element | null }) => {
  const { store } = useContext(Context);

  return (
    <FlexBlock className={styles.header}>
      <>
        <div>Сундучок сокровищ</div>
        {children}
        {store.user.id ? <Button onClick={() => store.logout()}>Выйти из профиля</Button> : null}
      </>
    </FlexBlock>
  );
};
