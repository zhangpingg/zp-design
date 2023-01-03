import React, { FC, useContext, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Select, ConfigProvider, Form } from 'antd';
import { ZpContext } from '../../ZpConfigProvider';
import { ZpSearchSelectProps, IObject } from '../interface';
import _ from 'lodash';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { useUpdateEffect } from 'ahooks';
import { getDisabledTitle } from '../common/utils';

interface IQueryParams {
  keyWord: string;
  firstFlag?: boolean;
  claerCodes?: boolean;
}
interface optionType extends DefaultOptionType {
  allData: IObject;
}

const SearchSelect: FC<ZpSearchSelectProps> = (props) => {
  const {
    mode,
    placeholder = '请选择',
    searchKey = '',
    extraPayLoads,
    queryFn,
    getLabel,
    valueKey = 'id',
    value,
    disabled,
    id = '',
    oneSelected,
    handleSelect,
    ...rest
  } = props;
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  // 是否是第一次加载页面的
  const isFirst = useRef(true);
  const [optionList, setOptionList] = useState<IObject[]>([]);
  const [fetching, setFetching] = useState(false);

  /**
   * 获取下拉框数据
   * keyWord：用于搜索传参
   * firstFlag：控制加载页面，表单值回填时是否查询接口，在onSelect时置为false
   *claerCodes：控制是否清除baseCodes
   */
  const queryData = (args: IQueryParams) => {
    const { keyWord, firstFlag = false, claerCodes = false } = args;
    setFetching(true);
    // 搜索的 key 参数对象
    const searchParams = { [searchKey ? searchKey : 'dataName']: keyWord };
    let baseCodes = value ? (_.isArray(value) ? value : [value]) : undefined;
    // 单选形式只在初始化时查询baseCodes，非初始化置空
    // 正常搜索选择后，再也不会走这里，若是赋值进来的，则需要传 baseCodes 选中值给后台
    if ((!mode && !isFirst.current) || claerCodes) {
      baseCodes = undefined;
    }
    const params = {
      pageIndex: 1,
      pageSize: 20,
      ...searchParams,
      ...extraPayLoads,
      baseCodes: !keyWord ? baseCodes : undefined, // 当输入框无值时，需搜索当前选中的值
    };
    if (firstFlag) isFirst.current = false;
    queryFn?.(params)
      .then((res) => {
        if (_.isArray(res)) {
          setOptionList(res);
        }
      })
      .finally(() => {
        setFetching(false);
      });
  };
  // 获取valueKey为数组时的value值
  const getValueObj = (valueKey: string[], value: IObject) => {
    const valueObj: IObject = {};
    valueKey?.forEach((key: string) => {
      valueObj[key] = value[key];
    });
    return valueObj;
  };
  /** 下拉框数据 */
  const getOptions = useMemo(
    (): optionType[] =>
      optionList.map((i) => {
        let valueObj = {};
        if (_.isArray(valueKey)) {
          valueObj = JSON.stringify(getValueObj(valueKey, i));
        }
        return {
          value: _.isArray(valueKey) ? valueObj : i[valueKey],
          label: _.isString(getLabel) ? i[getLabel] : getLabel?.(i),
          allData: i,
        };
      }),
    [optionList],
  );
  /** 不可编辑时的title展示 */
  const disabledTitle = useCallback(() => {
    return getDisabledTitle(value, getOptions);
  }, [value, getOptions]);

  useEffect(() => {
    if (value && isFirst.current) {
      queryData({ keyWord: '', firstFlag: true });
    }
    return () => {
      setOptionList([]);
    };
  }, [value]);

  useUpdateEffect(() => {
    queryData({ keyWord: '' });
  }, [extraPayLoads]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <Select
        mode={mode}
        showSearch
        allowClear
        placeholder={placeholder}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        filterOption={false}
        onSearch={_.debounce((val: string) => queryData({ keyWord: val }), 300)}
        onFocus={_.debounce(() => queryData({ keyWord: '' }), 300)}
        onClear={_.debounce(() => queryData({ keyWord: '', claerCodes: true }), 300)}
        options={getOptions}
        loading={fetching}
        value={value}
        maxTagCount="responsive"
        disabled={disabled}
        title={disabled && _.isArray(value) ? disabledTitle() : null}
        onSelect={(e: string | number, option: IObject) => {
          isFirst.current = false;
          handleSelect && handleSelect(option);
        }}
        {...rest}
      />
    </ConfigProvider>
  );
};

export default SearchSelect;
