import type { RadioProps } from 'antd';

export interface OptionsItemProps {
  label: string;
  value: number;
}
export interface ZpRadioBaseProps {
  /**
   * @description 单选框选项数据
   * @default []
   */
  options?: OptionsItemProps[];
}

export type ZpRadioProps = RadioProps & ZpRadioBaseProps;
