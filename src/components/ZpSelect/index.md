---
group:
  title: 组件
  path: /components
---

## ZpSelect

## 组件功能

> 1.  支持通过数据字典值作为下拉选项
> 2.  支持通过查询接口数据作为下拉选项
> 3.  支持获取具体的业务组件

## 传入字典值使用

> 需传入字典对象和对应字典键值

```tsx
import React from 'react';
import { ConfigProvider, Form } from 'antd';
import { ZpSelect } from 'zp-component-library';
import zhCN from 'antd/lib/locale/zh_CN';

export default () => {
  return (
    <ConfigProvider prefixCls="zp-ant" locale={zhCN}>
      <Form.Item label="字典Select" style={{ width: 400 }}>
        <ZpSelect
          dicts={{
            APPROVE_RESULT: {
              '1': '审批通过',
              '2': '审批拒绝',
              '3': '审批退回',
            },
          }}
          dictKey="APPROVE_RESULT"
        />
      </Form.Item>
    </ConfigProvider>
  );
};
```

## `API`

<API src="./api/ZpSelectProps.tsx" hideTitle></API> 其他 Select API 请参考[antd 官网](https://ant.design/components/select-cn/)
