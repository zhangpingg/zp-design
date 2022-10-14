import React, { FC, memo, useContext } from 'react';
import { ZpContext } from '../ZpConfigProvider';
import { ConfigProvider, Button } from 'antd';
import _ from 'lodash';
import { ZpDebounceButtonProps } from './interface';
import './foundation/index.less';

const ZpDebounceButton: FC<ZpDebounceButtonProps> = (props) => {
  let { prefix, antPrefix, antdConfigProvider } = useContext(ZpContext);
  const { onClick, time = 300, children, ...rest } = props;

  /** 给事件添加防抖 */
  const DebounceOnClick = _.debounce((e: any) => {
    onClick?.(e);
  }, time);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-zp-debounce-button`}>
        <Button {...rest} onClick={DebounceOnClick}>
          {children}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default memo(ZpDebounceButton);
