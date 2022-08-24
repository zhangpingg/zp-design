---
group:
  title: useDom 监听DOM改变
  path: /hooks
---

# useDom 监听 DOM 改变

## 基本介绍

dom 大小改变时的回调，返回当前元素本身

## TextArea 使用

```tsx
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import { useDom } from 'zp-component-library';
import _ from 'lodash';

const Demo2 = () => {
  const textAreaWrapRef: any = useRef();
  const [obj, setObj] = useState();

  /** 监听变化的元素 */
  useDom(textAreaWrapRef, (dom: any) => {
    if (!dom) {
      return;
    }
    const { clientWidth, clientHeight } = dom;
    setObj({ width: clientWidth, height: clientHeight });
  });

  return (
    <div ref={textAreaWrapRef}>
      {`宽: ${obj?.width} 高: ${obj?.height}`}
      <Input.TextArea />
    </div>
  );
};

export default Demo2;
```
