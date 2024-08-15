---
nav:
  title: ZpEllipsis
  desc: 文本省略号组件
group:
  title: 组件
  path: /components
---

# ZpEllipsis

> 显示的内容根据外层容器的宽度控制，超出显示`tooltip`,不超出则不显示

## 普通使用

```tsx
import React from 'react';
import { ZpEllipsis } from 'zp-design';

const Demo = () => {
  const testText =
    '测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本测试超长超出文本';
  return (
    <div>
      <div style={{ width: '100px' }}>
        <ZpEllipsis text={testText} />
      </div>{' '}
      <br />
      <ZpEllipsis text={testText} /> <br />
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
export default Demo;
```

## `API`

<API src="./api/ZpEllipsisProps.tsx" hideTitle></API>
