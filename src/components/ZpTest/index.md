---
nav:
  title: 组件
group:
  path: /components
---

# ZpTest

## 介绍

```tsx
import React, { useCallback, useMemo } from 'react';
import { ZpTest, ZpUtils } from 'zp-component-library';

export default () => {
  const { getTextWidth } = ZpUtils;

  console.log(getTextWidth('你好你好你好你好你好'));
  return <ZpTest />;
};
```
