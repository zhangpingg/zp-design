import type { RadioProps } from 'antd';

export interface OptionsItemProps {
  label: string;
  value: number;
}
// 自定义
export interface BaseRadioProps {
  /**
   * @description 单选框选项数据
   * @default []
   */
  options?: OptionsItemProps[];
}
// 字典
export interface DictRadioProps {
  /**
   * @description 字典对象（如果是字典单选项则必填）
   * @default {}
   */
  dicts?: object;
  /**
   * @description 字典对象的key（如果是字典单选项则必填）
   * @default ''
   */
  dictKey?: string;
  /**
   * @description 控制需要展示的值域，通过key控制，只在字典下拉选项中生效
   * @default []
   */
  include?: string[];
  /**
   * @description 控制不需要展示的值域，通过key控制，只在字典下拉选项中生效（与include同时存在时，只会include有效）
   * @default []
   */
  exclude?: string[];
}

// API 展示的
export type ZpRadioApiProps = BaseRadioProps | DictRadioProps;

export type ZpRadioProps = RadioProps & BaseRadioProps;
