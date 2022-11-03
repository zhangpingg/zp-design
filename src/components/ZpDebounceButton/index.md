---
nav:
  title: ZpDebounceButton
group:
  title: 组件
  path: /components
---

# ZpDebounceButton

## 介绍

> 防抖按钮和 antd 中的 Button 一样的使用方式，只是多了一个防抖时间 time（默认 300ms）默认开启 loading

## 基本使用，默认 300ms

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider } from 'antd';
import { ZpDebounceButton } from 'zp-component-library';

export default () => {
  const [num, setNum] = useState(0);

  const fn1 = useCallback(() => {
    setTimeout(() => {
      setNum((prev) => prev + 1);
    }, 2000);
  }, []);

  return (
    <ConfigProvider prefixCls="ant">
      <p>{num}</p>
      <ZpDebounceButton type="primary" loading={false} onClick={fn1}>
        防抖按钮
      </ZpDebounceButton>
    </ConfigProvider>
  );
};
```

## 模拟调用后台接口

<code src='./demo/interfaceData'></code>

## `API`

<API src="./api/ZpDebounceButtonProps.tsx" hideTitle></API>
