---
group:
  title: 组件
  path: /components
---

## ZpNumber

> 基于 `antd` 中的 `Input` 二次封装 <br /> 功能包括：输入整数位数、保留小数位、是否自动补 0、只能输入正整数

## 基本使用

```tsx
import React, { useState, useCallback, useEffect } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpNumber } from 'zp-design';

export default () => {
  const [form] = Form.useForm();

  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 数据回显 */
  const echo = () => {
    form.setFieldsValue({
      a: '-1234567',
      b: '12345.00',
      c: '12345.0000',
      d: '12345.0',
    });
  };

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Form.Item label="默认" name="a">
          <ZpNumber style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="8位整数位数" name="b" rules={[{ required: true, message: '请输入' }]}>
          <ZpNumber intDigits={8} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="保留2位小数" name="c">
          <ZpNumber precision={2} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="8位整数位数,保留4位小数,自动补0" name="d">
          <ZpNumber intDigits={8} precision={4} autoFill style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="保留2位小数,有单位" name="e">
          <ZpNumber precision={2} unit={'元'} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="正整数" name="f">
          <ZpNumber onlyInt style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="最小值10，最大值10000" name="g">
          <ZpNumber min={10} max={10000} style={{ width: '200px' }} />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={echo} style={{ marginLeft: '10px' }}>
        设置数据
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button, Row, Col } from 'antd';
import { ZpNumber } from 'zp-design';

export default () => {
  const [form] = Form.useForm();
  const [precisionFlag, setPrecisionFlag] = useState(true);

  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 数据回显 */
  const echo = () => {
    form.setFieldsValue({
      parGrossAmount: '12345',
    });
  };
  /** 切换全价的精度 */
  const changePrecision = (v) => {
    setPrecisionFlag((prev) => !prev);
  };

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Row>
          <Col span={12}>
            <Form.Item label="总额" name="mount" rules={[{ required: true, message: '请输入' }]}>
              <ZpNumber.Amount />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="全价"
              name="fullPrice"
              rules={[{ required: true, message: '请输入' }]}
            >
              <ZpNumber.FullPrice precision={precisionFlag ? 4 : 3} unit="11" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={echo} style={{ marginLeft: '10px' }}>
        设置值
      </Button>
      <Button type="primary" onClick={changePrecision} style={{ marginLeft: '10px' }}>
        切换全价精度
      </Button>
    </ConfigProvider>
  );
};
```

## 表单项有多个元素时，自定义拼接

> 当一个表单项有多个输入框时，需要开发自己拼接，这里只是提供一个 demo，供开发参考

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button, Row, Col } from 'antd';
import { ZpNumber } from 'zp-design';
import CustomComponentA from './customJoin/CustomComponentA';

export default () => {
  const [form] = Form.useForm();

  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  const setData = () => {
    form.setFieldsValue({
      customA: {
        a: '8888.00',
        b: '9999.00',
        c: true,
      },
    });
  };

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Row>
          <Col span={12} style={{ paddingRight: '20px' }}>
            <Form.Item
              label="自定义拼接"
              name="customA"
              rules={[{ required: true, message: '请输入' }]}
            >
              <CustomComponentA
                Form={Form}
                list={[
                  {
                    // precision: 4,  // 传的话，会覆盖原有的默认值
                    formItemAttr: {
                      name: ['customA', 'a'],
                      rules: [{ required: true, message: '请输入1' }],
                    },
                  },
                  {
                    // precision: 2,
                    formItemAttr: {
                      name: ['customA', 'b'],
                      rules: [{ required: true, message: '请输入2' }],
                    },
                  },
                  {
                    formItemAttr: {
                      name: ['customA', 'c'],
                    },
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={setData} style={{ marginLeft: '10px' }}>
        设置数据
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件描述

```tsx
import React, { useCallback } from 'react';
import { ConfigProvider, Table } from 'antd';
import { businessControlTypeList } from './const';

export default () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'label',
    },
    {
      title: 'key',
      dataIndex: 'value',
    },
    {
      title: '功能',
      dataIndex: 'description',
    },
  ];
  return (
    <ConfigProvider prefixCls="zp-ant">
      <Table
        rowKey="value"
        columns={columns}
        dataSource={businessControlTypeList}
        pagination={false}
        size="small"
        bordered
      />
    </ConfigProvider>
  );
};
```

## `API`

<API src="./api/ZpNumberProps.tsx" hideTitle></API>
