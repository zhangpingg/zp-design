import type { TooltipProps } from 'antd';
import type {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';
export interface ZpEllipsisBase {
  /**
   * @description 显示的文本
   * @requires
   */
  text: string;

  /**
   * @description 字体大小
   * @default 12px
   */
  fontSize?: string;

  /**
   * @description 超出几行显示省略号
   * @default 1
   */
  ellipsisRow?: number;

  /**
   * @description wrapper的样式
   * @default undefined
   */
  style?: CSSProperties;

  /**
   * @description 自定义render label的内容，注意不可使用影响布局的组件
   * @default undefined
   */
  render?: (text: string) => ReactNode;
}

export type ZpEllipsisProps = Omit<TooltipProps, 'title'> & ZpEllipsisBase;

export interface EllpsisWrapperProps
  extends Pick<ZpEllipsisProps, 'text' | 'ellipsisRow' | 'render'> {
  prefix: string;
  maxWidth: number;

  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onFocus?: FocusEventHandler;
  onClick?: MouseEventHandler;
}
