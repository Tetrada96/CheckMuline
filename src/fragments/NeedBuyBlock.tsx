import React, { useState } from 'react';

import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { Input } from '../components/Input/Input';
import { Button } from '../components/Button/Button';
import { postNeedBuyColors } from '../services/colors';
import styles from './styles.module.scss';

interface INeedBuyBlockProps {
  userId: string;
  showAllColors: () => void;
}

export const NeedBuyBlock = ({ userId, showAllColors }: INeedBuyBlockProps) => {
  const [needByeState, setNeedBuyState] = useState<string>('');

  const onPostNeedBuyColors = () => {
    postNeedBuyColors(userId, needByeState ? needByeState.trim()?.split(' ') : []).then(() => {
      showAllColors();
      setNeedBuyState('');
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPostNeedBuyColors();
    }
  };

  return (
    <FlexBlock className={styles.needByeBlock}>
      <Input value={needByeState} onKeyDown={onKeyDown} onChange={(e) => setNeedBuyState(e.target.value)} />
      <Button disabled={!needByeState} onClick={onPostNeedBuyColors}>
        Отметить как необходимые купить
      </Button>
    </FlexBlock>
  );
};
