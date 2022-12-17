import { SelectProps } from 'antd';

export type ZpSelectOptionValue = string | number | null;
export interface IObject {
  [key: string]: any;
}
/*
 ** 将类型中指定某几个类型转为必选，剩余类型保留
 */
type RequiredOptional<T, O extends keyof T> = Required<Pick<T, O>> & Omit<T, O>;

export type ZpSelectPropsBase = {
  /**
   * @description 当下拉选项只有一条数据时，是否默认选中
   * @default false
   */
  oneSelected?: boolean;
  /**
   * @description 控制需要展示的值域，只在字典下拉选项中生效
   * @default []
   */
  include?: string[];
  /**
   * @description 控制不需要展示的值域（与include同时传时只会生效一个）
   * @default []
   */
  exclude?: string[];
  /**
   * @description 数据字典
   * @default {}
   * @type object
   */
  dicts?: IObject;
  /**
   * @description 需要字典作为数据展示的字典键值
   * @default {}
   */
  dictKey?: string;
  /**
   * @description 下拉选项数据通过接口调用的api，返回Promise对象（下拉列表取接口哪个字段）
   * @default () => void
   */
  queryFn?: (params: IObject) => Promise<IObject[]>;
  /**
   * @description 调用接口模糊搜索的入参键值
   * @default -
   */
  searchKey?: string;
  /**
   * @description 查询接口额外需要的入参对象
   * @default {}
   * @type object
   */
  extraPayLoads?: IObject;
  /**
   * @description 选项展示的label，可传入数组对象对应的键值和自定义显示方法
   * @default -
   */
  getLabel?: string | Function;
  /**
   * @description 选中数据的value值，可传入对应键名或者数组
   * @default -
   */
  valueKey?: string | string[];
  /**
   * @description 是否需要精确搜索
   * @default false
   */
  isEexact?: boolean;
  /**
   * @description 鼠标移入下拉框显示的文字
   * @default -
   */
  title?: string;
  /**
   * @description 获取选中后的该条数据
   * @default -
   */
  handleSelect?: Function;
};

export type ZpSelectProps = ZpSelectPropsBase & SelectProps;

export type ZpDictSelectProps = Pick<
  ZpSelectProps,
  'dicts' | 'dictKey' | 'include' | 'exclude' | 'oneSelected' | 'title' | 'oneSelected'
> &
  SelectProps;

export type ZpSearchSelectProps = Pick<
  ZpSelectProps,
  | 'oneSelected'
  | 'queryFn'
  | 'searchKey'
  | 'extraPayLoads'
  | 'getLabel'
  | 'valueKey'
  | 'isEexact'
  | 'title'
  | 'handleSelect'
> &
  SelectProps;

// 搜索类型业务组件基本类型
export type ZpBaseSearchControlType = RequiredOptional<ZpSearchSelectProps, 'queryFn'>;

// 字典类型业务组件基本类型
export type ZpBaseDictControlType = Omit<RequiredOptional<ZpDictSelectProps, 'dicts'>, 'distKey'>;

// 组合名称 投资经理
export type ZpExtraSelectProps = RequiredOptional<ZpSearchSelectProps, 'queryFn' | 'extraPayLoads'>;
