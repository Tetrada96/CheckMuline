import React, { useContext } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import TableViewIcon from '@mui/icons-material/TableView';
import { useLocation, Link } from 'react-router-dom';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

import styles from './Menu.module.scss';
import { IconButton } from '../../components/IconButton/IconButton';
import { FlexBlock } from '../../components/FlexBlock/FlexBlock';
import { Context } from '../..';

export const Menu = observer(({ hide = false }: { hide?: boolean }) => {
  const { store } = useContext(Context);
  const { pathname } = useLocation();

  if (hide) {
    return null;
  }

  return (
    <FlexBlock className={styles.menuWrapper}>
      <FlexBlock className={styles.blockIcons}>
        <Link
          className={classNames(styles.link, {
            [styles.chooseLink]: pathname === '/colors',
            [styles.openMenu]: store.isOpenMenu,
          })}
          to="/colors"
        >
          <IconButton>
            <TableViewIcon />
          </IconButton>
          {store.isOpenMenu && <div style={{ width: 'max-content' }}>Моя таблица</div>}
        </Link>
        <Link
          className={classNames(styles.link, {
            [styles.chooseLink]: pathname === '/check',
            [styles.openMenu]: store.isOpenMenu,
          })}
          to="/check"
        >
          <IconButton>
            <DomainVerificationIcon />
          </IconButton>
          {store.isOpenMenu && <div style={{ width: 'max-content' }}>Проверить наличие</div>}
        </Link>
        <Link
          className={classNames(styles.link, {
            [styles.chooseLink]: pathname === '/need-buy',
            [styles.openMenu]: store.isOpenMenu,
          })}
          to="/need-buy"
        >
          <IconButton>
            <LocalGroceryStoreIcon />
          </IconButton>
          {store.isOpenMenu && <div style={{ width: 'max-content' }}>Необходимо купить</div>}
        </Link>
      </FlexBlock>
    </FlexBlock>
  );
});
