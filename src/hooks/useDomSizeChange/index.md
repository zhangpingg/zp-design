---
group:
  title: useDomSizeChange
  path: /hooks
---

# useDomSizeChange

## 基本介绍

dom 大小改变时的回调，返回当前元素本身

## div 显隐使用

```tsx
import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { useDomSizeChange } from 'zp-component-library';

const Demo1 = () => {
  const [visible, setVisible] = useState(true);
  const divRef: MutableRefObject<any> = useRef();
  const [obj, setObj] = useState();

  /** 监听变化的元素 */
  useDomSizeChange(divRef, (dom: Element) => {
    if (!dom) {
      return;
    }
    const { clientWidth, clientHeight } = dom;
    setObj({ width: clientWidth, height: clientHeight });
  });

  return (
    <div ref={divRef} style={{ border: '1px solid #000', padding: '10px' }}>
      {`宽: ${obj?.width} 高: ${obj?.height}`} <br />
      <Button
        type="primary"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
      >
        显隐内容
      </Button>
      {visible && <p>内容</p>}
    </div>
  );
};
export default Demo1;
```

## TextArea 使用

拖拽 TextArea 大小，时刻拿到宽高

```tsx
import React, { useRef, useState, MutableRefObject } from 'react';
import { Input } from 'antd';
import { useDomSizeChange } from 'zp-component-library';

const Demo2 = () => {
  const textAreaWrapRef: MutableRefObject<any> = useRef();
  const [obj, setObj] = useState();

  /** 监听变化的元素 */
  useDomSizeChange(textAreaWrapRef, (dom: Element) => {
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
