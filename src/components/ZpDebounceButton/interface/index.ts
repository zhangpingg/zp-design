import type { ButtonProps } from 'antd/es/button';

export type ZpDebounceButtonBaseProps = {
  /**
   * @description 防抖时间
   * @default 300ms
   */
  time?: number;
  /**
   * @description 点击事件，返回 false，则关闭按钮 loading
   * @default
   */
  onClick?: (e) => boolean;
};

export type ZpDebounceButtonProps = Omit<ButtonProps, 'onClick'> & ZpDebounceButtonBaseProps;
