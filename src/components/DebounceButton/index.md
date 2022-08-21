---
group:
  title: DebounceButton 防抖按钮
  path: /components/DebounceButton
---

# DebounceButton 防抖按钮

## 使用情况

防抖按钮和 antd 中的 Button 一样的使用方式，只是多了一个防抖时间 time（默认 300ms）

## 基本使用，默认 300ms

```tsx
import React, { useState, useCallback } from 'react';
import { DebounceButton } from 'zp-component-library';

const Demo = () => {
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const fn1 = useCallback(() => {
    setNum((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>{num}</p>
      <DebounceButton type="primary" onClick={fn1}>
        防抖按钮
      </DebounceButton>
    </div>
  );
};
export default Demo;
```

## 模拟调用后台接口

<code src='./DemoInterface'></code>
