---
nav:
  title: ZpDebounceButton
group:
  title: 组件
  path: /components
---

# ZpDebounceButton

## 介绍

> 防抖按钮和 antd 中的 Button 一样的使用方式，只是默认添加了 loading，还有多了一个防抖（默认 300ms）<br> 添加防抖函数，是为了避免多次重复点击

## 基本使用，默认 300ms

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider } from 'antd';
import { ZpDebounceButton } from 'zp-design';

const Demo = () => {
  const [num, setNum] = useState(0);

  /** 防抖按钮点击事件 */
  const fn1 = useCallback(async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setNum((prev) => prev + 1);
        resolve();
      }, 2000);
    });
  }, []);

  return (
    <ConfigProvider prefixCls="ant">
      <p>{num}</p>
      <ZpDebounceButton type="primary" onClick={fn1}>
        防抖按钮
      </ZpDebounceButton>
    </ConfigProvider>
  );
};
export default Demo;
```

## 模拟调用后台接口

<code src='./demo/interfaceData'></code>

## `API`

<API src="./api/ZpDebounceButtonProps.tsx" hideTitle></API>
