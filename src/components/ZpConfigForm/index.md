---
group:
  title: 组件
  path: /components
---

# ZpConfigForm

> 该组件基于 `antd` 表单进行封装，支持表单、表单项所有属性 <br /> 表单项列表是后台接口返回（可根据不同客户做出不同的配置，接口参数：userId、menuCode、formId） <br /> 表单每一项输入框都是自定义配置；表单项顺序，是否必填，是否显示，组件布局，表单 lable 文字，表单是否在更多区域等

## 普通使用

> 当后台接口返回标题时，则表单默认带有标题，也可以通过前端 `showTitle` 来控制是否显隐；通过点击 `icon` 收起/展开表单项<br /> 可以传入内部提交按钮，也可以外部自定义提交按钮<br /> (业务上，提交按钮一般会在弹框下方，侧边栏右下角等，该组件支持自定义提交按钮)

```tsx
import React, { useCallback, useMemo } from 'react';
import { ConfigProvider, Form, Button, Input, Select, DatePicker } from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import zhCN from 'antd/es/locale/zh_CN';
import { formList1 } from './const';

export default () => {
  const [form] = Form.useForm();

  const formList = useMemo(
    () => [
      {
        itemName: 'productName1',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'productCode',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'type',
        component: (
          <Select placeholder="请选择" allowClear>
            <Select.Option value="1">类型1</Select.Option>
            <Select.Option value="2">类型2</Select.Option>
            <Select.Option value="3">类型3</Select.Option>
          </Select>
        ),
      },
      {
        itemName: 'productName2',
        component: <Input placeholder="请输入" />,
      },
    ],
    [],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList1);
      }, 1000);
    });
  };
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 表单最后的元素，即提交按钮 */
  const lastElement = (
    <div>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </div>
  );

  return (
    <ConfigProvider prefixCls="zp-ant" locale={zhCN}>
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form02',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        form={form}
        Form={Form}
        colon={false}
        lastElement={lastElement}
      />
      <br />
      <Button type="primary" onClick={submit}>
        提交 (自定义)
      </Button>
    </ConfigProvider>
  );
};
```

## 无模块标题的使用

> 当后台接口返回标题为空值时，则自动隐藏标题，每个模块使用横线隔开。<br /> 有更多区域表单项时，自动显示【更多】按钮

```tsx
import React, { useCallback, useMemo } from 'react';
import { ConfigProvider, Form, Button, Input, Select, DatePicker } from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import zhCN from 'antd/es/locale/zh_CN';
import { formList2 } from './const';

export default () => {
  const [form] = Form.useForm();

  const formList = useMemo(
    () => [
      {
        itemName: 'productName1',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'productCode',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'type',
        component: (
          <Select placeholder="请选择" allowClear>
            <Select.Option value="1">类型1</Select.Option>
            <Select.Option value="2">类型2</Select.Option>
            <Select.Option value="3">类型3</Select.Option>
          </Select>
        ),
      },
      {
        itemName: 'address',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'productName2',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'date',
        component: <DatePicker placeholder="请选择" />,
      },
    ],
    [],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList2);
      }, 1000);
    });
  };
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 表单最后的元素，即提交按钮 */
  const lastElement = (
    <div>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </div>
  );

  return (
    <ConfigProvider prefixCls="xcd-ant" locale={zhCN}>
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form03',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        form={form}
        Form={Form}
        colon={false}
        lastElement={lastElement}
      />
    </ConfigProvider>
  );
};
```

## 有必填项，提示说明的表单

> 在 label 中增加了必填项，提示说明等元素，有占位宽度，需要注意 <br /> 兼容一个表单项中允许有多个元素的情况

```tsx
import React, { useCallback, useMemo, useEffect } from 'react';
import { ConfigProvider, Form, Button, Input, Select, DatePicker } from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import { InfoCircleOutlined } from '@ant-design/icons';
import { formList3 } from './const';

export default () => {
  const [form] = Form.useForm();

  const formList = useMemo(
    () => [
      {
        itemName: 'productName',
        component: <Input placeholder="请输入" />,
        tooltip: { title: '提示说明', icon: <InfoCircleOutlined /> },
      },
      {
        itemName: 'productCode',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'type',
        component: (
          <>
            <Form.Item
              name={['type', 'aa']}
              rules={[
                {
                  // 控制提示信息
                  required: true,
                  message: '请选择类型',
                },
              ]}
            >
              <Select placeholder="请选择" allowClear>
                <Select.Option value="1">类型1</Select.Option>
                <Select.Option value="2">类型2</Select.Option>
                <Select.Option value="3">类型3</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['type', 'bb']}
              rules={[
                {
                  // 控制提示信息
                  required: true,
                  message: '请输入',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </>
        ),
        tooltip: { title: '提示说明', icon: <InfoCircleOutlined /> },
        // 控制表单项 * 号
        rules: [{ required: true }],
      },
      {
        itemName: 'dateRange',
        component: <DatePicker.RangePicker />,
        tooltip: { title: '提示说明', icon: <InfoCircleOutlined /> },
      },
    ],
    [],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList3);
      }, 1000);
    });
  };
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 表单最后的元素，即提交按钮 */
  const lastElement = (
    <div>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </div>
  );

  useEffect(() => {
    form.setFieldsValue({
      type: {},
    });
  }, []);

  return (
    <ConfigProvider prefixCls="xcd-ant">
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form04',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        form={form}
        Form={Form}
        colon={false}
        lastElement={lastElement}
      />
    </ConfigProvider>
  );
};
```

## 复杂表单

> 该组件继承 form 属性，当更多区域存在表单项时，会自动出现更多按钮，默认返回值回显数据，表单提交验证，自定义栅格布局等 <br /> 通过 showTitle 控制是否隐藏标题，通过 showTitleIcon 控制是否隐藏标题后面的 icon <br />

```tsx
import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { ConfigProvider, Form, Button, Input, Select, DatePicker } from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import zhCN from 'antd/es/locale/zh_CN';
import { formList4 } from './const';
import { getFormItemConfig } from '../../api';
import moment from 'moment';

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const formList = useMemo(
    () => [
      {
        itemName: 'productName',
        component: <Input placeholder="请输入" />,
        hidden: visible ? 0 : 1,
      },
      {
        itemName: 'productCode',
        component: <Input placeholder="请输入" />,
      },
      {
        itemName: 'type',
        component: (
          <Select placeholder="请选择" allowClear>
            <Select.Option value="1">类型1</Select.Option>
            <Select.Option value="2">类型2</Select.Option>
            <Select.Option value="3">类型3</Select.Option>
          </Select>
        ),
      },
      {
        itemName: 'date',
        component: <DatePicker placeholder="请选择" />,
      },
      {
        itemName: 'dateRange',
        component: <DatePicker.RangePicker />,
      },
      {
        itemName: 'address',
        component: <Input.TextArea rows={4} placeholder="请输入" />,
      },
      {
        itemName: 'productName2',
        component: <Input placeholder="请输入111" />,
      },
      {
        itemName: 'type2',
        component: (
          <Select placeholder="请选择" allowClear>
            <Select.Option value="1">类型1</Select.Option>
            <Select.Option value="2">类型2</Select.Option>
            <Select.Option value="3">类型3</Select.Option>
          </Select>
        ),
      },
      {
        itemName: 'date2',
        component: <DatePicker placeholder="请选择" />,
      },
    ],
    [visible],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList4);
      }, 2000);
    });
  };
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);
  /** 格式化默认值，回显数据 */
  const formatDefVal = useCallback((data) => {
    const result = { ...data };
    for (let key in result) {
      switch (key) {
        case 'date':
          result[key] = moment(result[key], 'YYYY-MM-DD');
          break;
      }
    }
    return result;
  }, []);
  /** 切换显隐某些表单项 */
  const changeFormItem = () => {
    setVisible((prev) => !prev);
  };

  return (
    <ConfigProvider prefixCls="xcd-ant" locale={zhCN}>
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form01',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        formatDefVal={formatDefVal}
        form={form}
        Form={Form}
        // showTitle={false}
        // showTitleIcon = {false}
        colon={false}
      />
      <Button type="primary" onClick={submit}>
        提交
      </Button> <br />
      <br />
      <Button type="primary" onClick={changeFormItem}>
        切换显隐表单项
      </Button>
    </ConfigProvider>
  );
};
```

## 普通只读模式

> 即查看详情，跟表单一样的情况，只不过这里的右侧是文本，或者自定义的内容而已

```tsx
import React, { useCallback, useMemo } from 'react';
import {
  ConfigProvider,
  Form,
  Button,
  Input,
  Select,
  DatePicker,
  Progress,
  Card,
  Collapse,
} from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import zhCN from 'antd/es/locale/zh_CN';
import { formList5 } from './const';

export default () => {
  const [form] = Form.useForm();

  const formList = useMemo(
    () => [
      {
        itemName: 'productName1',
        component: <span>文本1</span>,
      },
      {
        itemName: 'productCode',
        component: <Progress percent={100} />,
      },
      {
        itemName: 'type',
        component: <span>文本3</span>,
      },
      {
        itemName: 'productName2',
        component: <span>文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4</span>,
      },
    ],
    [],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList5);
      }, 1000);
    });
  };

  return (
    <ConfigProvider prefixCls="xcd-ant" locale={zhCN}>
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form05',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        colon={false}
        showTitleIcon={false}
        readOnly
      />
    </ConfigProvider>
  );
};
```

## 特殊的只读模式

> 分块标题下面是自定义的内容，外部传入 chunkList。配置：分块标题下面只配置一条数据，且 itemname 配置为 empytChunk

```tsx
import React, { useCallback, useMemo } from 'react';
import {
  ConfigProvider,
  Form,
  Button,
  Input,
  Select,
  DatePicker,
  Progress,
  Card,
  Collapse,
} from 'antd';
import { ZpConfigForm } from 'zp-component-library';
import zhCN from 'antd/es/locale/zh_CN';
import { formList6 } from './const';

export default () => {
  const [form] = Form.useForm();

  const formList = useMemo(
    () => [
      {
        itemName: 'productName1',
        component: <span>文本1</span>,
      },
      {
        itemName: 'productCode',
        component: <Progress percent={100} />,
      },
      {
        itemName: 'type',
        component: <span>文本3</span>,
      },
      {
        itemName: 'productName2',
        component: <span>文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4文本4</span>,
      },
    ],
    [],
  );
  const chunkList = useMemo(
    () => [
      {
        component: (
          <Card title="卡片">
            <p>内容</p>
          </Card>
        ),
      },
      {
        component: (
          <Collapse>
            <Collapse.Panel header="This is panel header 1" key="1">
              <p>内容1</p>
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 2" key="2">
              <p>内容2</p>
            </Collapse.Panel>
          </Collapse>
        ),
      },
    ],
    [],
  );
  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formList6);
      }, 1000);
    });
  };

  return (
    <ConfigProvider prefixCls="xcd-ant" locale={zhCN}>
      <ZpConfigForm
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form05',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        chunkList={chunkList}
        colon={false}
        showTitleIcon={false}
        readOnly
      />
    </ConfigProvider>
  );
};
```

## 配置接口表单项

> userId、menuCode、formId 是针对该配置化表单而言，配置接口具体表单项时，请参考下方 API 中的 FormItemProps 第二小点

## `API`

### ZpConfigFormProps

> 以下属性是查询表单项列表的自定义参数，除此之外还支持 andt form 表单的所有属性

<API src="./api/ZpConfigFormProps.tsx" hideTitle></API>

### CommonConfigProps

<API src="./api/CommonConfigProps.tsx" hideTitle></API>

### FormItemProps

> 1. formList 表单项的配置中，itemName、component 是必填项，根据接口返回字段 itemName 匹配相应的组件 component，其他字段均取后台返回的数据，若前端传入其他的字段，则会覆盖掉接口的字段数据 <br />
> 2. 以下属性中除了 component，其他字段都是后台配置后返回的，配置表单时，可根据下面字段来配置

<API src="./api/FormItemProps.tsx" hideTitle></API>
