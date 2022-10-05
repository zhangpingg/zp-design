---
nav:
  title: ZpSplitPane
group:
  title: 组件
  path: /components
---

## ZpSplitPane

## 默认使用

```tsx
import React from 'react';
import { ZpSplitPane } from 'zp-component-library';

export default () => (
  <div style={{ height: '200px' }}>
    <ZpSplitPane>
      <div>第一个子元素</div>
      <div>第二个子元素</div>
    </ZpSplitPane>
  </div>
);
```

## 设置最大最小宽度

通过控制 primary 的最大与最小宽度控制拖拽范围

```tsx
import React from 'react';
import { ZpSplitPane } from 'zp-component-library';

export default () => (
  <div style={{ height: '200px' }}>
    <ZpSplitPane minSize={100} maxSize={300} defaultSize={110}>
      <div>第一个子元素：100~300</div>
      <div>第二个子元素</div>
    </ZpSplitPane>
  </div>
);
```

## 修改拖拽方向

通过`split` 设置`vertical`将拖拽方向修改成垂直方向。

```tsx
import React from 'react';
import { ZpSplitPane } from 'zp-component-library';

export default () => (
  <div style={{ height: '300px' }}>
    <ZpSplitPane minSize={100} maxSize={400} defaultSize={120} split="vertical">
      <div>第一个子元素：100~400</div>
      <div>第二个子元素</div>
    </ZpSplitPane>
  </div>
);
```

## 设置拖拽线的大小和颜色

```tsx
import React from 'react';
import { ZpSplitPane } from 'zp-component-library';

export default () => (
  <div style={{ height: '200px' }}>
    <ZpSplitPane
      minSize={100}
      maxSize={400}
      defaultSize={120}
      style={{
        '--drag-border-color': '#f00',
        '--drag-border-size': '5px',
      }}
    >
      <div>第一个子元素：100~400</div>
      <div>第二个子元素</div>
    </ZpSplitPane>
  </div>
);
```

## `API`

<API src="./api/ZpSplitPane.tsx" hideTitle></API>
