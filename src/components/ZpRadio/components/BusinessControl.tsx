import React, { FC, memo } from 'react';
import { ZpRadioProps } from '../interface';
import { businessMap } from '../const';
import ZpRadio from '..';

type BusinessControlProps = ZpRadioProps & { businessType: string };

const BusinessControl: FC<BusinessControlProps> = (props) => {
  const { businessType, ...lastProps } = props;
  return <ZpRadio options={businessMap[businessType]} {...lastProps} />;
};

export default memo(BusinessControl);
