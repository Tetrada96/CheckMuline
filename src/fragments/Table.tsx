import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, changeCount } from '../store/colorCountReducer';

import { IColor } from '../store/object';
import { RootState } from '../store/store';

export const Table = () => {
  const colors = useSelector((state: RootState) => state.colors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addInfo());
  }, []);

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch(changeCount({ value: e.target.value, id }));
  };
  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>DMC</th>
          <td>Цвет</td>
          <td>Color</td>
          <td>Наименование</td>
          <td>Количество</td>
        </tr>
      </thead>
      <tbody>
        {colors.map((item: IColor) => {
          return (
            <tr key={item.id}>
              <td>{item.DMC}</td>
              <td style={{ backgroundColor: item.color }}></td>
              <td>{item.nameColorEnd}</td>
              <td>{item.nameColorRu}</td>
              <td>
                <input
                  type="number"
                  value={item.count}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCount(e, item.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
