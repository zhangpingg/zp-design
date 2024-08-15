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
import { ZpSelect } from 'zp-design';
import zhCN from 'antd/lib/locale/zh_CN';

const Demo = () => {
  return (
    <ConfigProvider prefixCls="zp-ant" locale={zhCN}>
      <Form.Item label="字典 Select" style={{ width: 400 }}>
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

export default Demo;
```

## 传入查询接口使用

> 需传入对应的查询接口的 Promise 对象，如接口需要额外的查询参数，也需要一并传入，默认 value 取 id 值

```tsx
import React, { memo, useState } from 'react';
import { ZpSelect } from 'zp-design';
import { searchSelectApi } from '../../api/index';
import { IObject } from './interface';
import { ConfigProvider, Form, Button, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

const TextApp = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  ConfigProvider.config({
    prefixCls: 'zp-ant',
  });

  const fn1APi = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const list = [
          {
            id: 23341301,
            code: '000058',
            name: '监控组合',
          },
          {
            id: 23342018,
            code: '000009',
            name: '易方达天天理财货币A',
          },
          {
            id: 23341243,
            code: '000046',
            name: '空名字',
          },
          {
            id: 16002,
            code: '0000882',
            name: '0000889AAA',
          },
          {
            id: 21001,
            code: '00020005',
            name: '股票测试产品A',
          },
        ];
        resolve(list);
      }, 2000);
    });
  };

  return (
    <ConfigProvider prefixCls="zp-ant" locale={zhCN}>
      <Form form={form}>
        <Form.Item
          rules={[{ required: true, message: '请选择' }]}
          name="productCode"
          label="接口Select"
          style={{ width: 400 }}
        >
          <ZpSelect
            queryFn={(params) => {
              // searchSelectApi(params).then((res: any) => res || [])
              return fn1APi(params).then((res: any) => res || []);
            }}
            getLabel={(i: IObject) => `${i.code} ${i.name}`}
            extraPayLoads={{ operatorRights: '2' }}
            disabled={disabled}
            valueKey={['id', 'name']}
            mode="multiple"
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            form.validateFields().then((values) => {
              console.log('提交：', JSON.parse(values.productCode));
            });
          }}
        >
          提交
        </Button>
        <Button
          type="primary"
          onClick={() => {
            // form.setFieldValue('productCode', 23341301);  // 单选(id)
            // form.setFieldValue('productCode', JSON.stringify({id:23341301, name:'监控组合'})); // 单选(id, name)
            // form.setFieldValue('productCode', [23341301, 23341243]);  //多选(id)
            // 多选(id, name)
            form.setFieldValue('productCode', [
              JSON.stringify({ id: 23341301, name: '监控组合' }),
              JSON.stringify({ id: 23341243, name: '空名字' }),
            ]);
          }}
          style={{ marginLeft: 10 }}
        >
          赋值
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDisabled(!disabled);
          }}
          style={{ marginLeft: 10 }}
        >
          {disabled ? '取消置灰' : '置灰'}
        </Button>
      </Form>
    </ConfigProvider>
  );
};

export default TextApp;
```

## `API`

<API src="./api/ZpSelectProps.tsx" hideTitle></API> 其他 Select API 请参考[antd 官网](https://ant.design/components/select-cn/)
