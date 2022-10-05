import { CSSProperties, ReactNode } from 'react';

export interface ResizerProps {
  /**
   * @description 组件方向
   * @default horizontal
   */
  split: 'vertical' | 'horizontal';
  /**
   * @description 是否允许拖拽
   */
  allowResize?: boolean;

  onClick?: (e: MouseEvent) => any;
  onDoubleClick?: (e: MouseEvent) => any;
  onMouseDown?: (e: MouseEvent) => any;
  onTouchStart?: (e: TouchEvent) => any;
  onTouchEnd?: (e: TouchEvent | MouseEvent) => any;
}

type SplitPaneCssVar = Partial<{
  /**
   * @description 拖拽的颜色
   * @default #ddd
   */
  '--drag-border-color': string;
  /**
   * @description 拖拽线的大小
   * @default 2px
   */
  '--drag-border-size': string;
}>;

export interface ZpSplitPaneProps {
  /**
   * @description 组件方向
   * @default horizontal
   */
  split: 'vertical' | 'horizontal';
  /**
   * @description 最外层样式
   */
  style?: CSSProperties & SplitPaneCssVar;
  /**
   * @description 第一个子元素是可调整的区域还是第二个是可调整的区域
   * @default first
   */
  primary?: 'first' | 'second';
  /**
   * @description 调增模块的最小值 (px)
   * @default 50
   */
  minSize: number;
  /**
   * @description 可调整块的最大值
   * @default 1000
   */
  maxSize: number;
  /**
   * @description primary 默认的大小,如 50px,50等等
   * @default 50
   */
  defaultSize: number;
  /**
   * @description 是否可变大变小
   * @default true
   */
  allowResize: boolean;
  /**
   * @description 拖拽最小步长
   * @default 1
   */
  step: number;
  /**
   * @description 拖动过程回调
   */
  onChange?: (e: MouseEvent, newSize: number) => any;
  /**
   * @description 拖拽开始回调
   */
  onDragStarted?: (e: any) => any;
  /**
   * @description 拖拽结束回调
   */
  onDragFinished?: (e: any) => any;
  children?: ReactNode;
}
