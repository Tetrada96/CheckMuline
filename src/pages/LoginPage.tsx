import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '..';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import styles from './styles.module.scss';

export const LoginPage = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      store.login(email, password);
    }
  };

  const disabledButton = !email || !password;

  return (
    <FlexBlock className={styles.loginPageWrapper}>
      <FlexBlock className={styles.loginPage}>
        <div>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь'}</div>
        <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={disabledButton ? undefined : onKeyDown}
        />
        <Button
          className={styles.button}
          disabled={disabledButton}
          onClick={() => {
            store.login(email, password);
          }}
        >
          Логин
        </Button>
        <Button className={styles.button} disabled={disabledButton} onClick={() => store.registration(email, password)}>
          Регистрация
        </Button>
      </FlexBlock>
    </FlexBlock>
  );
});
