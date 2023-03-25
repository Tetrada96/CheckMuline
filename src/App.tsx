import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { LoginPage } from './pages/LoginPage';
import { PageColors } from './pages/PageColors';
import { PageCheckColors } from './pages/PageCheckColors';
import { PageNeedBuyColors } from './pages/PageNeedBuyColors';
import { Context } from '.';
import { Header } from './fragments/Header/Header';
import { Alert } from './components/Alert/Alert';
import './index.scss';
import { Menu } from './fragments/Menu/Menu';
import { FlexBlock } from './components/FlexBlock/FlexBlock';

function App() {
  const navigate = useNavigate();

  const { store } = useContext(Context);

  useEffect(() => {
    if (store.user.id) {
      navigate('/colors');
      return;
    }
    if (localStorage.getItem('token')) {
      store.checkAuth();
      return;
    }

    navigate('/');
  }, [store.user.id]);

  return (
    <div className="App">
      <Header hideMenu={!store.user.id} />
      <Alert />
      <FlexBlock className="WrapperContent">
        <Menu hide={!store.user.id} />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/check" element={<PageCheckColors />} />
          <Route path="/colors/" element={<PageColors />} />
          <Route path="/need-buy/" element={<PageNeedBuyColors />} />
        </Routes>
      </FlexBlock>
    </div>
  );
}

export default observer(App);
