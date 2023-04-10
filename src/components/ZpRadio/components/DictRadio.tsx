import React, { FC, memo, useContext, useMemo } from 'react';
import { ZpContext } from '../../ZpConfigProvider';
import { ConfigProvider, Radio } from 'antd';
import _ from 'lodash';
import { DictRadioProps, OptionsItemProps } from '../interface';

const DictRadio: FC<DictRadioProps> = (props) => {
  const { dicts = {}, dictKey = '', include = [], exclude = [], ...lastProps } = props;
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  const options = useMemo(() => {
    if (_.isEmpty(dicts) || dictKey === '') return [];
    const optionList = [];
    const dict = dicts?.[dictKey] || {};
    const valuesList: string[] = Object.values(dict);
    optionList.push(
      ...valuesList.map((i) => {
        const value = Object.entries(dict).find((d) => d[1] === i)![0];
        // label为字典键值，value为字典键名
        return {
          label: i,
          value: value,
        };
      }),
    );
    const filterList: OptionsItemProps[] = optionList.filter((item) => {
      if (!_.isEmpty(include) && _.isArray(include)) {
        return include.includes(item?.value);
      }
      if (!_.isEmpty(exclude) && _.isArray(exclude)) {
        return !exclude.includes(item.value!);
      }
      return true;
    });
    return filterList;
  }, [dicts]);

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

export default memo(DictRadio);
