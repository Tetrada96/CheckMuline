import React, { useEffect, useState } from 'react';
import { Table } from './fragments/Table';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Search } from './fragments/Search';
import { getColors } from './services/colors';
import { IColor } from './store/object';

function App() {
  const [colors, setColors] = useState<IColor[] | undefined>(undefined);

  useEffect(() => {
    getColors().then((data) => {
      setColors(data.data);
    });
  }, []);

  if (!colors) return null;

  return (
    <div className="App">
      <Provider store={store}>
        <Search colors={colors} />
        <Table colors={colors} setColors={setColors} />
      </Provider>
    </div>
  );
}

export default App;
