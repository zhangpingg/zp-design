import React, { FC, CSSProperties, ReactNode, useMemo } from 'react';

interface PaneProps {
  split: 'vertical' | 'horizontal'; // 分割方式
  size?: number; // 初始化默认大小
  eleRef?: (node: HTMLDivElement | null) => any; // 子元素的父盒子 ref
  children?: ReactNode; // 子元素x
}

const Pane: FC<PaneProps> = (props) => {
  const { children, split, size, eleRef } = props;

  /** 面板样式 */
  const style = useMemo<CSSProperties>(() => {
    const _style: CSSProperties = {
      position: 'relative',
      outline: 'none',
    };
    if (size) {
      if (split === 'horizontal') {
        _style.width = size;
      } else {
        _style.height = size;
      }
    } else {
      _style.flex = 1;
    }
    return _style;
  }, [size]);

  return (
    <div ref={eleRef} style={style}>
      {children}
    </div>
  );
};

export default Pane;
