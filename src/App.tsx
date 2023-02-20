import React from 'react';
import { Table } from './fragments/Table';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Search } from './fragments/Search';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Search />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
