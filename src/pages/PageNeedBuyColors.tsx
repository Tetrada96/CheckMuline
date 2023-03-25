import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { IColor } from '../store/object';
import { Table } from '../fragments/Table';
import { NeedBuyBlock } from '../fragments/NeedBuyBlock';
import { getColors } from '../services/colors';
import { Context } from '..';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';

export const PageNeedBuyColors = observer(() => {
  const [colors, setColors] = useState<IColor[] | undefined>(undefined);
  const { store } = useContext(Context);

  const showAllColors = () => {
    getColors(store.user.id).then((data) => {
      setColors(data.data.filter((item) => item.need_buy));
    });
  };

  useEffect(() => {
    if (!store.user.id) {
      return;
    }
    showAllColors();
  }, [store.user.id]);

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
          На этой странице вы можете увидеть и отметить цвета, которые необходимо докупить. Номера вводите без кавычек
          через пробел. Обратите внимание, что отметка &laquo;Выбранные как Необходимо купить&raquo; при изменении
          количества, будет снята для соответствующего цвета{' '}
        </div>
        <NeedBuyBlock showAllColors={showAllColors} userId={store.user.id} />
        <Table userId={store.user.id} showenColors={colors} setShowenColors={setColors} checked={true} />
      </FlexBlock>
    </FlexBlock>
  );
});
