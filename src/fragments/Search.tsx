import React from 'react';

import { Button } from '../components/Button/Button';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { Input } from '../components/Input/Input';
import styles from './styles.module.scss';

export const Search = ({
  searchState,
  checked,
  onCheckColors,
  setSearchState,
  showAllColors,
}: {
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
  searchState: string;
  checked: boolean;
  onCheckColors: () => void;
  showAllColors: () => void;
}) => {
  const onGetColorsHandler = () => {
    showAllColors();
    setSearchState('');
  };

  const onCheckHandler = () => {
    // if (!searchState) {
    //   onGetColorsHandler();
    //   return;
    // }
    onCheckColors();
  };

  return (
    <FlexBlock className={styles.searchWrapper}>
      <div>Введите номера цветов через пробел</div>
      <Input value={searchState} onChange={(e) => setSearchState(e.target.value)} />
      <Button disabled={checked} onClick={onCheckHandler}>
        Проверить
      </Button>
      <Button disabled={false} onClick={onGetColorsHandler}>
        Сбросить фильтр
      </Button>
    </FlexBlock>
  );
};
