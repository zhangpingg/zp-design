---
group:
  title: utils
  path: /utils
---

## nums

> 主要功能为数字的千分位转换、小数位数自动补充、数字加减乘除避免精度丢失

## formatter

> 千分符格式化(不自动补位) 入参 num：数字，tail：有小数点的情况下 可传入截取小数位数，默认 2

```tsx
import React, { useState } from 'react';
import { ZpUtils } from 'zp-component-library';
import { InputNumber, ConfigProvider } from 'antd';

const { formatNum } = ZpUtils;

const Demo = () => {
  const [num, setNum] = useState();

  const test = () => {
    return formatNum(num, 4, true);
  };
  return (
    <>
      <ConfigProvider prefixCls="zp-ant">
        <InputNumber
          value={num}
          onChange={(e) => setNum(e)}
          style={{ marginBottom: 20, width: 400 }}
        />
        <h3>千分位格式化(自动补位)：{test()}</h3>
      </ConfigProvider>
    </>
  );
};

export default Demo;
```

## plus

> 精确加

```tsx
import React from 'react';
import { ZpUtils } from 'zp-component-library';

const { plus } = ZpUtils;

const Demo = () => {
  const test = () => {
    return 0.1 + 0.2;
  };
  const test2 = () => {
    return plus(0.1, 0.2);
  };
  return (
    <>
      <h3>原生js：0.1 + 0.2 = {test()}</h3>
      <h3>plus方法：0.1 + 0.2 = {test2()}</h3>
    </>
  );
};

export default Demo;
```

## minus

> 精确减

```tsx
import React from 'react';
import { ZpUtils } from 'zp-component-library';

const { accReduce } = ZpUtils;

const Demo = () => {
  const test = () => {
    return 0.3 - 0.2;
  };
  const test2 = () => {
    return accReduce(0.3, 0.2);
  };
  return (
    <>
      <h3>原生js：0.3 - 0.2 = {test()}</h3>
      <h3>minus方法：0.3 - 0.2 = {test2()}</h3>
    </>
  );
};

export default Demo;
```

## accMul

> 精确乘

```tsx
import React from 'react';
import { ZpUtils } from 'zp-component-library';

const { accMul } = ZpUtils;

const Demo = () => {
  const test = () => {
    return 0.34 * 10000;
  };
  const test2 = () => {
    return accMul(0.34, 10000);
  };
  return (
    <>
      <h3>原生js：0.34 * 10000 = {test()}</h3>
      <h3>accMul方法：0.34 * 10000 = {test2()}</h3>
    </>
  );
};

export default Demo;
```

## accDiv

> 精确除

```tsx
import React from 'react';
import { ZpUtils } from 'zp-component-library';

const { accDiv } = ZpUtils;

const Demo = () => {
  const test = () => {
    return 0.3 / 10000;
  };
  const test2 = () => {
    return accDiv(0.3, 10000);
  };
  return (
    <>
      <h3>原生js：0.3 / 10000 = {test()}</h3>
      <h3>accDiv方法：0.3 / 10000 = {test2()}</h3>
    </>
  );
};

export default Demo;
```
