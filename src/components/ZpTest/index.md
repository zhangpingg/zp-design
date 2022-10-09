---
nav:
  title: ZpTest
group:
  title: 组件
  path: /components
---

# ZpTest

## 介绍

```tsx
import React, { useCallback, useMemo } from 'react';
import { ZpTest, ZpUtilsStr } from 'zp-component-library';

export default () => {
  const { getTextWidth } = ZpUtilsStr;
  console.log(getTextWidth('你好你好你好你好你好'));
  return <ZpTest />;
};
```
