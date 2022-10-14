import React, { useContext, useEffect } from 'react';
import { ZpContext } from '../ZpConfigProvider';
import { ConfigProvider, Button } from 'antd';

const ZpTest = () => {
  let { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  useEffect(() => {
    console.log(11, antPrefix);
  }, []);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <Button type="primary">按钮</Button>
    </ConfigProvider>
  );
};

export default ZpTest;
