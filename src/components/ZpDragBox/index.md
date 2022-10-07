---
nav:
  title: ZpDragBox
group:
  title: 组件
  path: /components
---

# ZpDragBox

> 拖拽排序列表

## 拖拽排序

```tsx
import React, { useState, useContext, useCallback } from 'react';
import { ConfigProvider } from 'antd';
import { ZpDragBox } from 'zp-component-library';
import { classNames } from 'classnames';
import { ZpContext } from '../ZpConfigProvider';
import { sortList } from './const';

export default () => {
  let { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  const dragEndCb = useCallback((list) => {
    console.log(list);
  }, []);
  /** 可拖拽的每一项 item */
  const dragItem = () => (item: DragItemProps, provided: DraggableProvided) => {
    return (
      <div key={item.dataIndex} ref={provided.innerRef} {...provided.draggableProps}>
        <span {...provided.dragHandleProps}>{item.title}</span>
      </div>
    );
  };

  return (
    <ConfigProvider prefixCls={antPrefix} {...antdConfigProvider}>
      <ZpDragBox
        id={'key'}
        uniqKey="dataIndex"
        dragList={sortList}
        render={dragItem()}
        dragEndCb={dragEndCb}
      />
    </ConfigProvider>
  );
};
```

## 其他内容

开发中
