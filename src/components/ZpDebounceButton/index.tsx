import React, { FC, memo, useContext } from 'react';
import { ZpContext } from '../ZpConfigProvider';
import { ConfigProvider, Button } from 'antd';
import _ from 'lodash';
import { ZpDebounceButtonProps } from './interface';
import './style/index.less';

const ZpDebounceButton: FC<ZpDebounceButtonProps> = (props) => {
  let { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  const { onClick, time = 300, children, ...rest } = props;

  /** 给事件添加防抖 */
  const DebounceOnClick = _.debounce((e: any) => {
    onClick?.(e);
  }, time);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-zpDebounceButton-wrap`}>
        <Button {...rest} onClick={DebounceOnClick}>
          {children}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default memo(ZpDebounceButton);
