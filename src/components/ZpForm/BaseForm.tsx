import { Form, FormProps, ConfigProvider } from 'antd';
import React, { memo, FC, useContext } from 'react';
import { ZpContext } from '../ZpConfigProvider';

const BaseForm: FC<FormProps> = (props) => {
  const { children } = props;
  const { antPrefix, antdConfigProvider } = useContext(ZpContext);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix || 'zp-ant'}>
      <Form {...props}>{children as any}</Form>
    </ConfigProvider>
  );
};

export default memo(BaseForm);
