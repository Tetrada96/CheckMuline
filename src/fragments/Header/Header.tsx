import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';

import styles from './Header.module.scss';
import { FlexBlock } from '../../components/FlexBlock/FlexBlock';
import { Context } from '../..';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';

export const Header = observer(({ children, hideMenu }: { children?: JSX.Element | null; hideMenu: boolean }) => {
  const { store } = useContext(Context);

  return (
    <FlexBlock className={styles.headerWrapper}>
      <>
        <FlexBlock className={styles.header}>
          {!hideMenu ? (
            <IconButton onClick={() => store.setIsOpenMenu()}>
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <div>Сундучок сокровищ</div>
        </FlexBlock>
        {children}
        {store.user.id ? (
          <Button className={styles.exitButton} onClick={() => store.logout()}>
            Выйти из профиля
          </Button>
        ) : null}
      </>
    </FlexBlock>
  );
});
