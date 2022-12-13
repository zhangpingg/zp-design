---
group:
  title: 组件
  path: /components
---

## ZpNumberRange

> 基于 `ZpNumber` 二次封装 <br> 区间输入框默认只能输入正整数 <br /> 因为是基于 `ZpNumber` 封装的，所以也可以手动配置更改，具体可查看【复杂使用】中的代码

## 基本使用

默认只能输入整数

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpNumberRange } from 'zp-component-library';

export default () => {
  const [form] = Form.useForm();

  /** 单位的下拉选项 */
  const unitOptions = {
    1: '时',
    2: '分',
    3: '秒',
  };

  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);

  return (
    <ConfigProvider prefixCls="zp-ant" size="small">
      <Form form={form}>
        <div>
          <Form.Item label="期限区间" name="timeRange">
            <ZpNumberRange
              Form={Form}
              unitOptions={unitOptions}
              defaultUnit="3"
              list={[
                {
                  formItemAttr: {
                    name: ['timeRange', 'value1'],
                  },
                },
                {
                  formItemAttr: {
                    name: ['timeRange', 'value2'],
                  },
                },
                {
                  formItemAttr: {
                    name: ['timeRange', 'value3'],
                  },
                },
              ]}
            />
          </Form.Item>
        </div>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </ConfigProvider>
  );
};
```

## 复杂使用

自定义修改输入框的控制，比如可以输入小数，保留小数位等，具体参数可以参考 ZpNumber APi

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpNumberRange } from 'zp-component-library';

export default () => {
  const [form] = Form.useForm();

  /** 单位的下拉选项 */
  const unitOptions = {
    1: '时',
    2: '分',
    3: '秒',
  };

  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 数据回显 */
  const setData = useCallback(() => {
    form.setFieldsValue({
      timeRange: {
        start: '8888',
        end: '9999',
        unit: '3',
      },
    });
  }, []);

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form}>
        <Form.Item
          label="期限区间"
          name="timeRange"
          rules={[{ required: true, message: '请选择' }]}
        >
          <ZpNumberRange
            Form={Form}
            unitOptions={unitOptions}
            defaultUnit="3"
            list={[
              {
                onlyInt: false, // 会覆盖原有参数
                precision: 2, // 新增参数，参考 ZpNumber 组件
                formItemAttr: {
                  name: ['timeRange', 'start'],
                  rules: [{ required: true, message: '请选择最小值' }],
                },
              },
              {
                formItemAttr: {
                  name: ['timeRange', 'end'],
                  rules: [{ required: true, message: '请选择最大值' }],
                },
              },
              {
                formItemAttr: {
                  name: ['timeRange', 'unit'],
                },
              },
            ]}
            form={form}
          />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit} style={{ marginRight: '10px' }}>
        提交
      </Button>
      <Button type="primary" onClick={setData}>
        数据回显
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件

```tsx
import React, { useState, useCallback } from 'react';
import { ConfigProvider, Form, Button } from 'antd';
import { ZpNumberRange } from 'zp-component-library';

export default () => {
  const [form] = Form.useForm();

  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 数据回显 */
  const setData = useCallback(() => {
    form.setFieldsValue({
      remainMaturity: {
        remaMatyStrtNum: '8888',
        remaMatyEndNum: '9999',
        remaMatyNumUnit: '3',
      },
    });
  }, []);
  /** 监听数据 */
  const watchChange = (data) => {
    console.log('变化的数据: ', data);
  };

  return (
    <ConfigProvider prefixCls="zp-ant">
      <Form form={form} onValuesChange={watchChange}>
        <Form.Item label="剩余期限" name="remainMaturity">
          <ZpNumberRange.RemainMaturity
            Form={Form}
            // unitOptions={DICTS.REMA_MATY_NUM_UNIT}
            unitOptions={{
              1: '天',
              2: '月',
              3: '年',
            }}
            fatherName={'remainMaturity'} // 此处传父级的name值
          />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
      <Button type="primary" onClick={setData} style={{ marginLeft: '10px' }}>
        数据回显
      </Button>
    </ConfigProvider>
  );
};
```

## 业务组件类型

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

<API src="./api/ZpNumberRangeProps.tsx" hideTitle></API>
