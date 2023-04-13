import React, { FC, memo, useContext, useState } from 'react';
import { ZpContext } from '../ZpConfigProvider';
import { ConfigProvider, Button } from 'antd';
import _ from 'lodash';
import { ZpDebounceButtonProps } from './interface';
import './foundation/index.less';

const ZpDebounceButton: FC<ZpDebounceButtonProps> = (props) => {
  const { prefix, antPrefix, antdConfigProvider } = useContext(ZpContext);
  const { onClick, time = 300, children, ...rest } = props;
  const [loading, setLoading] = useState(false);

  /** 给事件添加防抖 */
  const debounceOnClick = _.debounce(async (e: any) => {
    setLoading(true);
    await onClick?.(e);
    setLoading(false);
  }, time);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-zp-debounce-button`}>
        <Button loading={loading} onClick={debounceOnClick} {...rest}>
          {children}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default memo(ZpDebounceButton);
