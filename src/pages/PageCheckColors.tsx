import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IColor } from '../store/object';
import { Table } from '../fragments/Table';
import { Search } from '../fragments/Search';
import { checkColors } from '../services/colors';
import { Context } from '..';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';

export const PageCheckColors = observer(() => {
  const [colors, setColors] = useState<IColor[] | undefined>(undefined);
  const [searchState, setSearchState] = useState<string>('');
  const { store } = useContext(Context);

  useEffect(() => {
    if (!store.user.id) {
      return;
    }
  }, [store.user.id]);

  const onCheckColors = () => {
    checkColors(store.user.id, searchState ? searchState.trim()?.split(' ') : []).then((data) => {
      setColors(data.data);
    });
  };

  return (
    <FlexBlock style={{ width: '100%', height: '100%' }}>
      <FlexBlock
        style={{
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          gap: '20px',
          paddingTop: '20px',
        }}
      >
        <div style={{ padding: '0 50px', textAlign: 'center' }}>
          На этой странице вы можете проверить наличие цветов в своей таблице. Номера вводите без кавычек через пробел.
          При нажатии на кнопку &laquo;Проверить&raquo; будет представлен список из выбранных цветов. Если какоц-то цвет
          введен неправильно, то появится сообщение об этом. В полученном списке вы также можете изменять количество
          ниточек для выбранного номера
        </div>
        <Search searchState={searchState} setSearchState={setSearchState} onCheckColors={onCheckColors} />
        <Table
          userId={store.user.id}
          showenColors={colors}
          setShowenColors={setColors}
          onCheckColors={onCheckColors}
          searchState={searchState}
        />
      </FlexBlock>
    </FlexBlock>
  );
});
