---
group:
  title: 组件
  path: /components
---

## ZpRadio

> 基于 `antd` 中的 `Radio` 二次封装，继承 `Radio` 的所有属性 <br /> 可以使用业务组件，也可以自定义单选框数据

## 自定义单选框数据

```tsx
import React, { useState, useMemo, useCallback } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpRadio } from 'zp-component-library';

export default () => {
  const [form] = Form.useForm();

  const options = useMemo(() => {
    return [
      { label: '西藏', value: 1 },
      { label: '青岛', value: 2 },
      { label: '三亚', value: 3 },
    ];
  }, []);
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 设置数据 */
  const setData = useCallback(() => {
    form.setFieldsValue({
      address: 3,
    });
  }, []);

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Form.Item label="旅游地点" name="address" rules={[{ required: true, message: '请选择' }]}>
          <ZpRadio options={options} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={setData} style={{ marginLeft: '10px' }}>
        设置
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpRadio } from 'zp-component-library';

export default () => {
  const [form] = Form.useForm();

  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 设置数据 */
  const setData = useCallback(() => {
    form.setFieldsValue({
      tradeDirection: 2,
      associateType: 3,
    });
  }, []);

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Form.Item
          label="交易方向"
          name="tradeDirection"
          rules={[{ required: true, message: '请选择' }]}
        >
          <ZpRadio.TradeDirection />
        </Form.Item>
        <Form.Item
          label="关联类型"
          name="associateType"
          rules={[{ required: true, message: '请选择' }]}
        >
          <ZpRadio.AssociateType />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={setData} style={{ marginLeft: '10px' }}>
        设置
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件类型

```tsx
import React, { useCallback } from 'react';
import { ConfigProvider, Button } from 'antd';
import { businessMap } from './const';

export default () => {
  const printList = useCallback(() => {
    console.log('业务组件类型：', businessMap);
  }, []);

  return (
    <ConfigProvider prefixCls="zp-ant">
      <p>打印后，请在控制台查看</p>
      <Button type="primary" onClick={printList}>
        控制台打印
      </Button>
    </ConfigProvider>
  );
};
```

## `API`

<API src="./api/ZpRadioProps.tsx" hideTitle></API>
