import React from 'react';
import { objectColor, IColor } from '../store/object';

export const Table = () => {
  return (
    <table>
      <thead>
        <td>DMC</td>
        <td>Цвет</td>
        <td>Color</td>
        <td>Наименование</td>
        <td>Количество</td>
      </thead>
      <tbody>
        {objectColor.map((item: IColor) => {
          return (
            <tr key={item.id}>
              <td>{item.DMC}</td>
              <td style={{ backgroundColor: item.color }}></td>
              <td>{item.nameColorEnd}</td>
              <td>{item.nameColorRu}</td>
              <td>{item.count}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
