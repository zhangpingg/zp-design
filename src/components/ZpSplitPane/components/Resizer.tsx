import React, { SyntheticEvent, FC, useMemo, CSSProperties } from 'react';
import { ResizerProps } from '../interface';

/** 阻止默认事件 */
const preventDefaultEvent = (e: SyntheticEvent, cb?: (e: any) => any) => {
  e.preventDefault();
  cb && cb(e);
};

const Resizer: FC<ResizerProps> = (props) => {
  const {
    allowResize, // 是否允许拖拽
    onClick,
    onMouseDown,
    onTouchStart,
    split, // 分割方式
  } = props;

  /** 分割线的样式 */
  const splitStyle = useMemo(() => {
    let base: CSSProperties = {
      backgroundColor: 'transparent',
      position: 'absolute',
    };
    if (!allowResize) {
      // 不允许拖拽时
      return {
        ...base,
        cursor: 'default',
      };
    }
    // const pos = 'calc(50% - 3px)';
    if (split === 'horizontal') {
      base = {
        ...base,
        width: '6px',
        cursor: 'col-resize',
        top: 0,
        bottom: 0,
        // left: pos,
      };
    }
    if (split === 'vertical') {
      base = {
        ...base,
        height: '6px',
        cursor: 'row-resize',
        left: 0,
        right: 0,
        // top: pos,
      };
    }
    return base;
  }, [allowResize, split]);

  /** 外层盒子样式 */
  const wrapperStyle = useMemo(() => {
    let base: CSSProperties = {
      background: 'var(--drag-border-color)',
      position: 'relative',
    };
    if (split === 'horizontal') {
      base = { ...base, width: 'var(--drag-border-size)' };
    } else {
      base = { ...base, height: 'var(--drag-border-size)' };
    }
    return base;
  }, [split]);

  return (
    <div style={wrapperStyle}>
      <span
        style={splitStyle}
        onMouseDown={(event) => onMouseDown?.((event as unknown) as MouseEvent)}
        onTouchStart={(event) => preventDefaultEvent(event, onTouchStart)}
        onClick={(event) => preventDefaultEvent(event, onClick)}
      />
    </div>
  );
};
export default Resizer;
