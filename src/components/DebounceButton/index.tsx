import React, { FC, memo } from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import _ from 'lodash';
import 'antd/dist/antd.css';

interface IProps extends ButtonProps {
  time?: number;
}

const DebounceButton: FC<IProps> = (props) => {
  const { onClick, time = 300, children, ...rest } = props;

  /** 给事件添加防抖 */
  const DebounceOnClick = _.debounce((e: any) => {
    onClick?.(e);
  }, time);

  return (
    <Button {...rest} onClick={DebounceOnClick}>
      {children}
    </Button>
  );
};

export default memo(DebounceButton);
