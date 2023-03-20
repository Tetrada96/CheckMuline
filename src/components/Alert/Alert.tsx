import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Context } from '../../index';
import styles from './Alert.module.scss';

export const Alert = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      store.setAlert(false, '');
    }, 2000);
  }, [store.error]);

  return <div className={classNames(styles.alert, { [styles.errorAlert]: store.error })}>{store.message}</div>;
});
