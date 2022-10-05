import React, { CSSProperties, FC, useState, ReactNode, useMemo, useCallback } from 'react';
import { SplitPaneWapper } from './styles';
import Pane from './components/Pane';
import Resizer from './components/Resizer';
import { ZpSplitPaneProps } from './interface';

// 把 children 的两个子元素放进数组中，方便分别渲染，并去掉为null的子元素
const removeNullChildren = (
  children: ReactNode | ReactNode[],
): (React.ReactChild | React.ReactFragment | React.ReactPortal)[] => {
  return React.Children.toArray(children).filter((c) => c);
};

const ZpSplitPane: FC<ZpSplitPaneProps> = (props) => {
  const {
    allowResize = true, // 是否可变大变小
    children,
    split = 'horizontal', // 分割方式  "vertical" | "horizontal"
    primary = 'first', // 主要盒子是第一个子元素，还是第二个元素（即可调整的）, "first" | "second"
    step = 1, // 拖拽最小步长
    minSize = 100, // 左侧块的最小宽度
    maxSize = 500, // 左侧块的最大宽度
    defaultSize = (minSize + maxSize) / 2, // 主要盒子的默认的大小（初始化的时候）
    style,
    onDragStarted, // 拖拽开始回调
    onDragFinished, // 拖拽结束回调
    onChange, // 拖动过程回调
  } = props;

  const notNullChildren = removeNullChildren(children);
  const [pane1, setPane1] = useState<HTMLDivElement | null>(null); // 元素1
  const [pane2, setPane2] = useState<HTMLDivElement | null>(null); // 元素2

  /** 外面盒子样式 */
  const warpperStyle: CSSProperties = {
    flexDirection: split === 'horizontal' ? 'row' : 'column',
    ...style,
  };
  /** 获取面板默认大小 */
  const getPaneDefaultSize = useCallback(
    (paneType: string, primaryType: string): number | undefined => {
      if (paneType === 'pane1') {
        if (primaryType === 'first') {
          return defaultSize;
        } else {
          return undefined;
        }
      } else {
        if (primaryType === 'second') {
          return defaultSize;
        } else {
          return undefined;
        }
      }
    },
    [defaultSize],
  );

  /** 鼠标按键被松开时触发，用户完成元素拖动后触发 */
  const onMouseUp = (e: MouseEvent) => {
    onDragFinished && onDragFinished(e);
    document.onmouseup = null;
    document.onmousemove = null;
    document.ondragend = null;
  };

  /** 鼠标按下 */
  const onMouseDown = (event: MouseEvent) => {
    if (!allowResize) {
      return;
    }
    const position = split === 'vertical' ? event.clientY : event.clientX; // 按下的时候坐标系x、y值
    const dragNode = primary === 'first' ? pane1 : pane2; // 移动的元素
    if (!dragNode) {
      return;
    }
    /** 按下前的主元素宽、高 */
    const oldSize = split === 'vertical' ? dragNode.offsetHeight || 0 : dragNode.offsetWidth || 0;

    document.onmouseup = onMouseUp; // 鼠标按键被松开时触发
    document.ondragend = onMouseUp; // 用户完成元素拖动后触发
    document.onmousemove = (e: MouseEvent) => {
      // 在鼠标指针移到指定的对象时发生（即在document上移动时触发）
      // 计算拖动元素的新的大小
      // 获取鼠标偏移的位置
      const currentPosition = split === 'vertical' ? e.clientY : e.clientX;
      const positionOffest = currentPosition - position; // 偏移量

      // 如果偏移量小于setp，不重新赋值
      if (Math.abs(positionOffest) < step) {
        return;
      }
      let newSize = oldSize + positionOffest; // 重新赋值大小
      if (newSize < minSize) {
        newSize = minSize;
      } else if (newSize > maxSize) {
        newSize = maxSize;
      }
      dragNode.style[split === 'vertical' ? 'height' : 'width'] = newSize + 'px';
      onChange && onChange(e, newSize);
    };
    onDragStarted && onDragStarted(event);
  };

  return (
    <SplitPaneWapper style={warpperStyle}>
      <Pane
        key="pane1"
        split={split}
        eleRef={(node) => setPane1(node)}
        size={getPaneDefaultSize('pane1', primary)}
      >
        {notNullChildren[0]}
      </Pane>
      <Resizer key="resizer" split={split} onMouseDown={onMouseDown} allowResize={allowResize} />
      <Pane
        key="pane2"
        split={split}
        eleRef={(node) => setPane2(node)}
        size={getPaneDefaultSize('pane2', primary)}
      >
        {notNullChildren[1]}
      </Pane>
    </SplitPaneWapper>
  );
};

export default ZpSplitPane;
