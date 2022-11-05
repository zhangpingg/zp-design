---
group:
  title: 组件
  path: /components
---

## ZpViewText

> 纯文字展示组件，具有以下功能<br /> > <span><span style="color: red">\*</span> 需注意: 目前该组件仅支持文字行高 <code style="color: red">18px-42px</code> 之间才能正常使用</span> 支持文字纯展示支持多行省略

## 基本使用

默认不省略，全部展示

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';
import { ZpViewText } from 'zp-component-library';
import { text } from './const';

export default () => (
  <ConfigProvider prefixCls="zp-ant">
    <ZpViewText text={text} />
  </ConfigProvider>
);
```

## 默认省略

展示时需要省略，默认超出 2 行省略

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';
import { ZpViewText } from 'zp-component-library';
import { text } from './const';

export default () => (
  <ConfigProvider prefixCls="zp-ant">
    <ZpViewText text={text} isEllipsis />
  </ConfigProvider>
);
```

## 自定义省略时

可通过传 rowEllipsis 来控制省略几行，当传 rowEllipsis 时，isEllipsis 必传

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';
import { ZpViewText } from 'zp-component-library';
import { text } from './const';

export default () => (
  <ConfigProvider prefixCls="zp-ant">
    一行省略
    <hr />
    <ZpViewText text={text} isEllipsis rowEllipsis={1} />
    <br />
    三行省略
    <hr />
    <ZpViewText text={text} isEllipsis rowEllipsis={3} style={{ lineHeight: '30px' }} />
  </ConfigProvider>
);
```

## `API`

<API src="./api/ZpViewText.tsx" hideTitle></API>
