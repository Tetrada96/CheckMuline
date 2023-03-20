import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IColor } from '../store/object';
import { Table } from '../fragments/Table';
import { Search } from '../fragments/Search';
import { NeedBuyBlock } from '../fragments/NeedBuyBlock';
import { getColors, checkColors } from '../services/colors';
import { Context } from '..';

export const PageColors = observer(() => {
  const [colors, setColors] = useState<IColor[] | undefined>(undefined);
  const [searchState, setSearchState] = useState<string>('');
  const { store } = useContext(Context);
  const [checked, setChecked] = useState(false);

  const showAllColors = () => {
    getColors(store.user.id).then((data) => {
      setColors(data.data);
    });
  };

  const onGetColorsHandler = () => {
    showAllColors();
    if (checked) {
      onChangeCheckbox();
    }
  };

  useEffect(() => {
    if (!store.user.id) {
      return;
    }
    showAllColors();
  }, [store.user.id]);

  if (!colors) {
    return null;
  }

  const getData = () => {
    return getColors(store.user.id).then((data) => data.data);
  };

  const onChangeCheckbox = () => {
    setChecked(!checked);
    if (!checked) {
      getData().then((items) => setColors(items.filter((item) => item.need_buy !== false)));
    } else {
      if (!searchState) {
        getData().then((items) => setColors(items));
      } else {
        onCheckColors();
      }
    }
  };

  const onCheckColors = () => {
    checkColors(store.user.id, searchState ? searchState.trim()?.split(' ') : []).then((data) => {
      setColors(data.data.filter((item) => (checked ? item.need_buy !== false : true)));
    });
  };

  return (
    <>
      <Search
        searchState={searchState}
        checked={checked}
        setSearchState={setSearchState}
        onCheckColors={onCheckColors}
        showAllColors={onGetColorsHandler}
      />
      <NeedBuyBlock
        checked={checked}
        onChangeCheckbox={onChangeCheckbox}
        showAllColors={showAllColors}
        userId={store.user.id}
      />
      <Table
        userId={store.user.id}
        searchState={searchState}
        showenColors={colors}
        onCheckColors={onCheckColors}
        setShowenColors={setColors}
        checked={checked}
      />
    </>
  );
});
