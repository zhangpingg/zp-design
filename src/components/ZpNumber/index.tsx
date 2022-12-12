import React from 'react';
import ZpNumberBase from './components';
import BusinessControl from './components/BusinessControl';
import { ZpNumberProps } from './interface';

const ZpNumber: any = ZpNumberBase;
ZpNumber.Amount = (props: ZpNumberProps) => <BusinessControl businessType="Amount" {...props} />;
ZpNumber.FullPrice = (props: ZpNumberProps) => (
  <BusinessControl businessType="FullPrice" {...props} />
);

export default ZpNumber;
