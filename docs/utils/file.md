---
group:
  title: utils
  path: /utils
---

# file

> 字符串相关的方法

## downloadFile

获取字符串的在元素中的宽度

```ts
import { ZpUtils } from 'zp-component-library';

const { downloadFile } = ZpUtils;

const downloadFileFn = async () => {
  const res = await downloadApi();
  downloadFile(res);
};
```
