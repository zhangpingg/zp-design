import React from 'react';
import { ZpConfigProviderProp } from './interface';

const defaultValue: ZpConfigProviderProp = {
  prefix: 'zp',
  antPrefix: 'zp-ant',
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
