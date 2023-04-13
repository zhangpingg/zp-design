import React, {
  FC,
  useContext,
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { Select, ConfigProvider } from 'antd';
import { ZpContext } from '../../ZpConfigProvider';
import { ZpSearchSelectProps, IObject } from '../interface';
import _ from 'lodash';
import type { DefaultOptionType } from 'rc-select/lib/Select';
import { useUpdateEffect } from 'ahooks';
import { getDisabledTitle } from '../common/utils';

interface IQueryParams {
  keyWord: string;
  isHasFillVal?: boolean;
  claerCodes?: boolean;
  firstFlag?: boolean;
}
interface optionType extends DefaultOptionType {
  allData: IObject;
}

const SearchSelect: FC<ZpSearchSelectProps> = (props) => {
  const {
    mode,
    placeholder = '请选择',
    searchKey = 'dataName',
    extraPayLoads,
    queryFn,
    getLabel,
    valueKey = 'id',
    value,
    disabled,
    handleSelect,
    ...rest
  } = props;
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  // 是否是首次打开加载该组件
  const isFirst = useRef(true);
  const [optionList, setOptionList] = useState<IObject[]>([]);
  const [fetching, setFetching] = useState(false);

  /**
   * 获取下拉框数据
   * @keyWord：下拉框输入的内容
   * @isHasFillVal：是否对下拉框有回填值-即是否有回填|选中,如果有，则设置为true
   * @claerCodes：是否清除 baseCodes
   */
  const queryData = (args: IQueryParams) => {
    const { keyWord, isHasFillVal = false, claerCodes = false } = args;
    setFetching(true);
    // 搜索的 key 参数对象
    const searchParams = { [searchKey]: keyWord }; // 下拉框输入的内容 {key: value}
    let baseCodes = value && (_.isArray(value) ? value : [value]); // 有值：不管是单选还是多选，最后都转成数组的形式
    // 条件：单选框且第二次搜索的时候 | claerCodes-ture => 清空baseCodes
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
    if (isHasFillVal) isFirst.current = false;
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
        onClear={_.debounce(
          () => queryData({ keyWord: '', claerCodes: true }),
          300,
        )}
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
