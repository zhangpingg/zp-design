import React, { FC, memo, useContext } from 'react';
import { ZpContext } from '@/components/ZpConfigProvider';
import { ConfigProvider, Button } from 'antd';
import type { ButtonProps } from 'antd/es/button';
import _ from 'lodash';
import './style/index.less';

interface IProps extends ButtonProps {
  time?: number;
}

const DebounceButton: FC<IProps> = (props) => {
  let { prefix = 'zp', antPrefix ='zp-ant', antdConfigProvider } = useContext(ZpContext);
  const { onClick, time = 300, children, ...rest } = props;

  /** 给事件添加防抖 */
  const DebounceOnClick = _.debounce((e: any) => {
    onClick?.(e);
  }, time);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-debounceButton-wrap`}>
        <Button {...rest} onClick={DebounceOnClick}>
          {children}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default memo(DebounceButton);
