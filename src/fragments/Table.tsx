import React, { ChangeEvent } from 'react';

import { Input } from '../components/Input/Input';
import { Tr } from '../components/Tr/Tr';
import { Td } from '../components/Td/Td';
import { changeColorCount, getColors } from '../services/colors';
import { IColor } from '../store/object';
import styles from './styles.module.scss';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';

export const Table = ({
  showenColors,
  userId,
  searchState,
  checked,
  onCheckColors,
  setShowenColors,
}: {
  showenColors?: IColor[];
  userId: string;
  setShowenColors: React.Dispatch<React.SetStateAction<IColor[] | undefined>>;
  searchState?: string;
  checked?: boolean;
  onCheckColors?: () => void;
}) => {
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    changeColorCount(userId, id, Number(e.target.value)).then(() => {
      if (!searchState && !checked) {
        getColors(userId).then((data) => {
          setShowenColors(data.data);
        });
      }
      if (searchState) {
        onCheckColors && onCheckColors();
        return;
      }
      if (checked) {
        getColors(userId).then((data) => {
          setShowenColors(data.data.filter((item) => item.need_buy));
        });
      }
    });
  };

  if (!showenColors) return null;

  const errorColor = showenColors.filter((item: IColor) => item.error);
  const successColor = showenColors.filter((item: IColor) => !item.error);

  return (
    <FlexBlock showAllHeight>
      <div className={styles.tableWrapper}>
        {errorColor.length !== 0
          ? errorColor.map((item) => <div key={item.dmc}>{`${item.dmc} такого цвета нет в таблице`}</div>)
          : null}
        {successColor.length !== 0 ? (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <Tr isHead>
                <Td>dmc</Td>
                <Td>Цвет</Td>
                <Td className={styles.TdHide}>Color</Td>
                <Td className={styles.TdHide}>Наименование</Td>
                <Td>Количество</Td>
              </Tr>
            </thead>
            <tbody>
              {successColor.map((item: IColor) => {
                return (
                  <Tr needBye={item.need_buy} key={item.id}>
                    <Td className={styles.Td}>{item.dmc}</Td>
                    <Td className={styles.Td} style={{ backgroundColor: item.color }}></Td>
                    <Td className={styles.TdHide} style={{ width: '250px' }}>
                      {item.name_color_eng}
                    </Td>
                    <Td className={styles.TdHide} style={{ width: '400px' }}>
                      {item.name_color_ru}
                    </Td>
                    <Td className={styles.Td}>
                      <Input
                        className={styles.tableInput}
                        type="number"
                        value={item.count}
                        onChange={(e) => onChangeCount(e, item.dmc)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </FlexBlock>
  );
};
