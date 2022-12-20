import React, { memo, useContext, useCallback, useMemo } from 'react';
import { Select, ConfigProvider, Form } from 'antd';
import { ZpContext } from '../../ZpConfigProvider';
import { ZpDictSelectProps } from '../interface';
import _ from 'lodash';
import { getDisabledTitle } from '../common/utils';

const DictSelect: React.FC<ZpDictSelectProps> = (props) => {
  const {
    placeholder = '请选择',
    dicts = {},
    dictKey = '',
    include = [],
    exclude = [],
    oneSelected,
    value,
    disabled,
    ...rest
  } = props;
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  /** 获取下拉框数据 */
  const getOptions = useMemo(() => {
    if (_.isEmpty(dicts) || dictKey === '') return [];
    const optionList = [];
    const dict = dicts[dictKey] || {};
    let distValuesList: string[] = Object.values(dict);
    if (!_.isEmpty(include)) {
      const newArr = distValuesList.filter((d) => include.includes(d));
      distValuesList = [...newArr];
    } else if (_.isEmpty(include) && !_.isEmpty(exclude)) {
      const newArr = distValuesList.filter((d) => !exclude.includes(d));
      distValuesList = [...newArr];
    }
    optionList.push(
      ...distValuesList.map((i) => {
        const value = Object.entries(dict).find((d) => d[1] === i)![0];
        // label为字典键值，value为字典键名
        return {
          label: i,
          value: value,
        };
      }),
    );
    return optionList;
  }, [dicts]);

  const disabledTitle = useCallback(() => {
    return getDisabledTitle(value, getOptions);
  }, [value, getOptions]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <Select
        showSearch
        allowClear
        placeholder={placeholder}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        options={getOptions}
        filterOption={(input, option) =>
          (option!.label as unknown as string).includes(input) ||
          (option!.value as unknown as string).includes(input)
        }
        value={value}
        disabled={disabled}
        title={disabled && _.isArray(value) ? disabledTitle() : null}
        {...rest}
      />
    </ConfigProvider>
  );
};

export default memo(DictSelect);
