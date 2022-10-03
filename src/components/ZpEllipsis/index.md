---
nav:
  title: ZpEllipsis
group:
  title: 组件
  path: /components
---

# ZpEllipsis

> 由于 `UI` 规范，原生的 `title` 满足不了 `UE` 的需求，并且还需要控制文本必须要出现`...`才能显示 `tooltip`。`v2.0.30`新增组件

## 普通使用

> 显示的内容根据外层容器的宽度控制，超出显示`tooltip`,不超出则不显示

```tsx
import React from 'react';
import { ZpEllipsis } from 'zp-component-library';

export default () => {
  const testText =
    '测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本';
  return (
    <div>
      <div style={{ width: '100px' }}>
        <ZpEllipsis text={testText} />
      </div>  <br />
      
      <ZpEllipsis text={testText} />  <br />

      <div style={{ width: '300px' }}>
        <ZpEllipsis
          text={testText}
          ellipsisRow={2}
          color="red"
          placement="bottom"
        />
      </div>
    </div>
  );
};
```

## `API`

<API src="./api/ZpEllipsisProps.tsx" hideTitle></API>
