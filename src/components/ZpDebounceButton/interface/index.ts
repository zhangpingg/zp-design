import type { ButtonProps } from 'antd/es/button';

export type ZpDebounceButtonBase = {
  /**
  * @description 防抖时间
  * @default 300ms
  */
  time?: number;
}

export type ZpDebounceButtonProps = ButtonProps & ZpDebounceButtonBase;
