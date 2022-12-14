import React from 'react';
import ZpRadioBase from './components';
import BusinessControl from './components/BusinessControl';
import { ZpRadioBaseProps } from './interface';

const ZpRadio: any = ZpRadioBase;
ZpRadio.TradeDirection = (props: ZpRadioBaseProps) => (
  <BusinessControl businessType="TradeDirection" {...props} />
);
ZpRadio.AssociateType = (props: ZpRadioBaseProps) => (
  <BusinessControl businessType="AssociateType" {...props} />
);

export default ZpRadio;
