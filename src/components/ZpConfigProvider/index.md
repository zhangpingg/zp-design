---
nav:
  title: 组件库
group:
  title: 组件
  path: /components
---

## ZpConfigProvider

> 在创建 `zp-design` 组件时必须使用的组件，提供给 `zp-design` 使用的通用参数的 `provider` 组件,一般使用在组件的最外层，类型于 `antd` 的 `ConfigProvider`；将这些值传给 `value`

## antd3 使用

```javascript
import { ZpConfigProvider } from 'zp-design';
import { message } from 'antd';

<ZpConfigProvider
  value={{
    antPrefix: 'zp-ant',
    antVersion: '3',
    components: { message },
  }}
>
  // 你的组件
</ZpConfigProvider>;
```

## antd4 使用

```javascript
import { ZpConfigProvider } from 'zp-design';
import { message } from 'antd';

<ZpConfigProvider
  value={{
    antPrefix: 'zp-ant',
    antVersion: '4',
  }}
>
  // 你的组件
</ZpConfigProvider>;
```

## `API`

<API src="./api/ZpConfigProvider.tsx" hideTitle></API>
