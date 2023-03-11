import React, { useEffect, useState } from 'react';
import { Table } from './fragments/Table';
import { Search } from './fragments/Search';
import { getColors } from './services/colors';
import { IColor } from './store/object';

function App() {
  const [colors, setColors] = useState<IColor[] | undefined>(undefined);
  const [searchState, setSearchState] = useState<string>('');

  useEffect(() => {
    getColors().then((data) => {
      setColors(data.data);
    });
  }, []);

  if (!colors) return null;

  return (
    <div className="App">
      <Search searchState={searchState} setSearchState={setSearchState} setColors={setColors} />
      <Table searchState={searchState} colors={colors} setColors={setColors} />
    </div>
  );
}

export default App;
