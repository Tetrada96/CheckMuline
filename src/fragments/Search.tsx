import React from 'react';
import { Button } from '../components/Button/Button';

import { Input } from '../components/Input/Input';
import { checkColors, getColors } from '../services/colors';
import { IColor } from '../store/object';

export const Search = ({
  setColors,
  searchState,
  setSearchState,
}: {
  setColors: React.Dispatch<React.SetStateAction<IColor[] | undefined>>;
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
  searchState: string;
}) => {
  const onGetColorsHandler = () => {
    getColors().then((data) => {
      setColors(data.data);
      setSearchState('');
    });
  };

  const onCheckHandler = () => {
    if (!searchState) {
      onGetColorsHandler();
      return;
    }
    checkColors(searchState.trim()?.split(' ')).then((data) => {
      setColors(data.data);
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      Введите номера цветов через пробел
      <Input value={searchState} onChange={(e) => setSearchState(e.target.value)} />
      <Button text="Проверить" disabled={!searchState} onClick={onCheckHandler} />
      <Button text="Сбросить фильтр" disabled={false} onClick={onGetColorsHandler} />
    </div>
  );
};
