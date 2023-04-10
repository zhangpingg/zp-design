import React from 'react';
import BaseRadio from './components/BaseRadio';
import BusinessControl from './components/BusinessControl';
import DictRadio from './components/DictRadio';
import { BaseRadioProps, DictRadioProps } from './interface';

const ZpRadio: any = BaseRadio;
ZpRadio.TradeDirection = (props: BaseRadioProps) => (
  <BusinessControl businessType="TradeDirection" {...props} />
);
ZpRadio.AssociateType = (props: BaseRadioProps) => (
  <BusinessControl businessType="AssociateType" {...props} />
);
ZpRadio.DictRadio = (props: DictRadioProps) => <DictRadio {...props} />;

export default ZpRadio;
