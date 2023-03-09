import React, { useState } from 'react';
import { IColor } from '../store/object';

export const Search = ({ colors }: { colors: IColor[] }) => {
  const [state, setState] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<{ id: string; DMC: string; text: string }[]>();

  const onCheckHandler = () => {
    const arrayValue = state === '' ? undefined : new Set(state?.split(' '));
    console.log(arrayValue);
    const thisResult = [];
    if (!arrayValue) {
      setResult([]);
      return;
    }
    for (const value of arrayValue) {
      const thisColor = colors.find((item) => item.DMC === value);
      if (!thisColor) {
        thisResult.push({ id: crypto.randomUUID(), DMC: value, text: 'Такого цвета нет в таблице' });
      } else {
        thisResult.push({ id: thisColor.id, DMC: value, text: `В наличии ${thisColor.count}` });
      }
    }
    setResult(thisResult);
  };

  return (
    <div>
      Введите номера цветов через пробел
      <input onChange={(e) => setState(e.target.value)} />
      {result &&
        result.map((item) => {
          return <div key={item.id}>{`${item.DMC} - ${item.text}`}</div>;
        })}
      <button onClick={onCheckHandler}>Проверить</button>
    </div>
  );
};
