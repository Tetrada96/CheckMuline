import React, { ChangeEvent } from 'react';

import { changeColorCount, getColors } from '../services/colors';
import { IColor } from '../store/object';

export const Table = ({
  colors,
  setColors,
}: {
  colors: IColor[];
  setColors: React.Dispatch<React.SetStateAction<IColor[] | undefined>>;
}) => {
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    changeColorCount(id, Number(e.target.value)).then(() =>
      getColors().then((data) => {
        setColors(data.data);
      })
    );
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCount(e, item.DMC)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
