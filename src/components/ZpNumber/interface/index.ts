import { CSSProperties } from 'react';
import type { InputProps } from 'antd';

export interface ZpNumberBaseProps {
  /**
   * @description 可输入的整数位数
   * @default
   */
  intDigits?: number;
  /**
   * @description 数值精度
   * @default
   */
  precision?: number;
  /**
   * @description 保留小数点的位数后，是否自动补 0
   * @default false
   */
  autoFill?: boolean;
  /**
   * @description 单位
   * @default
   */
  unit?: string;
  /**
   * @description 是否只能输入整数
   * @default false
   */
  onlyInt?: boolean;
  /**
   * @description wrapper的样式
   * @default
   */
  style?: CSSProperties;
  /**
   * @description 业务组件类型，当传入该参数的时候，其他字段不传可以
   * @default
   */
  // businessControlType?: string;
  /**
   * @description 每个输入自定义name,rules，当一个表单项有多个input的时候使用
   * @default
   */
  formItemAttr?: any;
  /**
   * @description 输入框的 change 事件
   * @default
   */
  onChange?: Function;
  /**
   * @description 输入框的 onBlur 事件
   * @default
   */
  onBlur?: Function;
}

export type ZpNumberProps = Omit<InputProps, 'onChange' | 'onBlur'> & ZpNumberBaseProps;
