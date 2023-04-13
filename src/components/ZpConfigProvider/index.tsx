import React from 'react';
import { ZpConfigProviderProps } from './interface';

const defaultValue: ZpConfigProviderProps = {
  prefix: 'zp', // 开发代码，类名前缀
  antPrefix: 'zp-ant', // antd组件，类名前端
  antVersion: '4',
  components: {
    message: undefined,
  },
  antdConfigProvider: {},
};

export const ZpContext = React.createContext(defaultValue);

const ZpConfigProvider = ZpContext.Provider;

export default ZpConfigProvider;
export const ZpConfigConsumer = ZpContext.Consumer;
