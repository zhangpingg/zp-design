import { CSSProperties } from 'react';

export type IXoViewOnlyTextProps = {
  /**
   * @description 展示的文字内容
   * @default
   */
  text: string;

  /**
   * @description 文字内容是否省略
   * @default false
   */
  isEllipsis?: boolean;

  /**
   * @description 文字内容超出几行省略，只有 isEllipsis = true 时，该字段传入才生效
   * @default 2
   */
  rowEllipsis?: number;

  /**
   * @description css 样式
   * @default CSSProperties
   */
  style?: CSSProperties;
};
