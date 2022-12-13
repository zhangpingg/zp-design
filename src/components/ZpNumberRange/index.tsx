import React from 'react';
import ZpNumberRangeBase from './components';
import BusinessControl from './components/BusinessControl';
import { ZpNumberRangeProps } from './interface';

const ZpNumberRange: any = ZpNumberRangeBase;
ZpNumberRange.RemainMaturity = (props: ZpNumberRangeProps) => (
  <BusinessControl businessType="RemainMaturity" {...props} />
);

export default ZpNumberRange;
