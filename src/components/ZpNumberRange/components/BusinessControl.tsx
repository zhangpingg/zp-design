import React, { FC, memo } from 'react';
import ZpNumberRange from '.';
import { ZpNumberRangeProps } from '../interface';

type BusinessControlProps = ZpNumberRangeProps & { businessType: string };

const BusinessControl: FC<BusinessControlProps> = (props) => {
  const { businessType, fatherName, ...rest } = props;
  let config = null;

  switch (businessType) {
    case 'RemainMaturity':
      config = {
        defaultUnit: '3',
        list: [
          {
            formItemAttr: {
              name: [fatherName, 'remaMatyStrtNum'],
            },
          },
          {
            formItemAttr: {
              name: [fatherName, 'remaMatyEndNum'],
            },
          },
          {
            formItemAttr: {
              name: [fatherName, 'remaMatyNumUnit'],
            },
          },
        ],
      };
      break;
  }
  return <ZpNumberRange {...config} {...rest} />;
};

export default memo(BusinessControl);
