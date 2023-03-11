import React, { ChangeEvent } from 'react';

import { Input } from '../components/Input/Input';
import { Tr } from '../components/Tr/Tr';
import { Td } from '../components/Td/Td';
import { changeColorCount, checkColors, getColors } from '../services/colors';
import { IColor } from '../store/object';

export const Table = ({
  colors,
  searchState,
  setColors,
}: {
  colors: IColor[];
  searchState: string;
  setColors: React.Dispatch<React.SetStateAction<IColor[] | undefined>>;
}) => {
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    changeColorCount(id, Number(e.target.value)).then(() => {
      if (!searchState) {
        getColors().then((data) => {
          setColors(data.data);
        });
      } else {
        checkColors(searchState.trim()?.split(' ')).then((data) => {
          setColors(data.data);
        });
      }
    });
  };

  const errorColor = colors.filter((item: IColor) => item.error);
  const successColor = colors.filter((item: IColor) => !item.error);

  return (
    <div>
      {errorColor.length !== 0
        ? errorColor.map((item) => <div key={item.dmc}>{`${item.dmc} такого цвета нет в таблице`}</div>)
        : null}
      {successColor.length !== 0 ? (
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <Tr>
              <Td>dmc</Td>
              <Td>Цвет</Td>
              <Td>Color</Td>
              <Td>Наименование</Td>
              <Td>Количество</Td>
            </Tr>
          </thead>
          <tbody>
            {successColor.map((item: IColor) => {
              return (
                <Tr key={item.id}>
                  <Td>{item.dmc}</Td>
                  <Td style={{ backgroundColor: item.color }}></Td>
                  <Td>{item.name_color_eng}</Td>
                  <Td>{item.name_color_ru}</Td>
                  <Td>
                    <Input type="number" value={item.count} onChange={(e) => onChangeCount(e, item.dmc)} />
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};
