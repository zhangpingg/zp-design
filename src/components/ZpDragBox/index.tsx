import React, { FC, useEffect, useState, useContext } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DragBoxProps, DragItemProps } from './interface';
import DragItems from './dragItems';
import { ZpContext } from '../ZpConfigProvider';
import { ConfigProvider } from 'antd';

const ZpDragBox: FC<DragBoxProps> = (props) => {
  const { dragList = [], dragEndCb } = props;
  const { antPrefix, antdConfigProvider } = useContext(ZpContext);
  const [list, setList] = useState<DragItemProps[]>([]);

  /** 拖拽完成的回调 */
  const dragEnd = (e: DropResult) => {
    const { source, destination } = e; // 来源、目的地
    if (!destination) {
      return;
    }
    const tempList = [...list];
    const startIndex = source.index;
    let endIndex = destination.index;
    const tempItem = list[startIndex];
    const isAsc = startIndex > endIndex;
    // 在一个非 disabled 的位置放下
    if (tempList[endIndex].disabled) {
      endIndex = (() => {
        let result = endIndex;
        if (isAsc) {
          for (let i = endIndex + 1; i <= startIndex; i++) {
            if (!tempList[i].disabled) {
              result = i;
              break;
            }
          }
        } else {
          for (let i = endIndex - 1; i >= startIndex; i--) {
            if (!tempList[i].disabled) {
              result = i;
              break;
            }
          }
        }
        return result;
      })();
    }
    // 往上拖拽升序
    if (isAsc) {
      for (let i = startIndex; i > endIndex; i--) {
        tempList[i] = tempList[i - 1];
      }
    } else {
      for (let i = startIndex; i < endIndex; i++) {
        tempList[i] = tempList[i + 1];
      }
    }
    tempList[endIndex] = tempItem;
    dragEndCb?.(tempList);
    setList(tempList);
  };

  useEffect(() => {
    setList(dragList);
  }, [dragList]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <DragDropContext onDragEnd={(e) => dragEnd(e)}>
        {<DragItems {...props} dragList={list} />}
      </DragDropContext>
    </ConfigProvider>
  );
};

export default ZpDragBox;
