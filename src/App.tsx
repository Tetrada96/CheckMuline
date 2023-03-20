import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { LoginPage } from './pages/LoginPage';
import { PageColors } from './pages/PageColors';
import { Context } from '.';
import { Header } from './fragments/Header/Header';
import { Alert } from './components/Alert/Alert';
import './index.scss';

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
      <Header />
      <Alert />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/colors/" element={<PageColors />} />
      </Routes>
    </div>
  );
}

export default observer(App);
