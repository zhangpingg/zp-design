import React, { FC, memo, useContext } from 'react';
import { ZpContext } from '../../ZpConfigProvider';
import { ConfigProvider, Radio } from 'antd';
import { ZpRadioProps, OptionsItemProps } from '../interface';

const ZpRadio: FC<ZpRadioProps> = (props) => {
  const { options = [], ...lastProps } = props;
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <Radio.Group {...lastProps}>
        {options.map((item: OptionsItemProps) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </ConfigProvider>
  );
};

export default memo(ZpRadio);
