import React, { useState } from 'react';

import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { postNeedBuyColors } from '../services/colors';
import styles from './styles.module.scss';

interface INeedBuyBlockProps {
  userId: string;
  checked: boolean;
  onChangeCheckbox: () => void;
  showAllColors: () => void;
}

export const NeedBuyBlock = ({ userId, checked, onChangeCheckbox, showAllColors }: INeedBuyBlockProps) => {
  const [needByeState, setNeedBuyState] = useState<string>('');

  const onPostNeedBuyColors = () => {
    postNeedBuyColors(userId, needByeState ? needByeState.trim()?.split(' ') : []).then(() => {
      showAllColors();
      setNeedBuyState('');
    });
  };

  return (
    <FlexBlock className={styles.needByeBlock}>
      <FlexBlock>
        <input
          type="checkbox"
          id="showNeedBuyColors"
          name="showNeedBuyColors"
          checked={checked}
          onChange={onChangeCheckbox}
        />
        <label htmlFor="showNeedBuyColors">Показать цвета, которые необходимо купить</label>
      </FlexBlock>
      <Input value={needByeState} onChange={(e) => setNeedBuyState(e.target.value)} />
      <Button disabled={!needByeState} onClick={onPostNeedBuyColors}>
        Отметить как необходимые купить
      </Button>
    </FlexBlock>
  );
};
