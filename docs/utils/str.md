---
group:
  title: utils
  path: /utils
---

# str

> 字符串相关的方法

## getTextWidth

获取字符串的在元素中的宽度

```tsx
import React, { useEffect } from 'react';
import { ZpUtils } from 'zp-design';

const { getTextWidth } = ZpUtils;

export default () => {
  return <div>文字宽度:{getTextWidth('你好你好你好你好你好')}</div>;
};
```
