---
group:
  title: 组件
  path: /components
---

# ZpSearchForm

普通筛选

## 基础使用

> 该组件基于 `antd` 表单进行封装(所以支持表单和表单项的所有属性，自己新增了一部分，**表单项中的 name 字段为必填项，且一个组件必需唯一**)，对设计师提出的以下功能进行了封装：
>
> 1. 查询组件需要进行响应式计算，当页面宽度小于 `1200` 时，一行显示两个表单项，当页面宽度小于 `1600` 时，一行显示 `3` 个表单项；当大于 `1600 `时，一行显示 `4` 个表单项
> 2. 表单筛选中的 `label` 的最大宽度为 96px，超出需要`...`，并显示 tooltip
> 3. 组件支持展开收起功能
> 4. 查询按钮一直靠右

> 如下，引入组件即可使用查询筛选，需要注意以下几点：
>
> 1. `UI` 给出的边框阴影可自己实现(最新规范是不需要)
> 2. 当组件的文本过长时，推荐结合 `ZpEllipsis` 组件使用更佳，否之需要自己实现文本超出不显示的功能。
> 3. 当需要对 `label` 为 `ReactNode` 时，请手动计算出 `labelWidth` ，传给表单项，方便计算最大宽度，并且如果给出的超出了 `96`，会以 `96` 作为最大宽度
> 4. 当使用 `Form.Item` 的 `tooltip`，属性时，注意下前面的文本会不会过长，导致内容被遮挡
> 5. 当需要使用表单的校验时，务必需要传`Form`属性，注意，只有`antd v4` 才可以使用。
> 6. `Form.item` 的 `required` 属性只表示样式，没有校验的功能，需要校验时还需传入`rules`

```tsx
import React from 'react';
import { ZpSearchForm, ZpEllipsis } from 'zp-design';
import { Input, Select, Form, Button } from 'antd';

const { Option } = Select;
export default () => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [form] = Form.useForm();

  const searchForm = () => {
    form.validateFields().then((res) => {
      console.log(res);
    });
  };

  const resetFormValue = () => {
    form.resetFields();
  };

  const lastElement = (
    <>
      <Button type="primary" onClick={searchForm}>
        查询
      </Button>
      <Button type="ghost" onClick={resetFormValue}>
        重置
      </Button>
    </>
  );

  const formList = [
    {
      label: '邮箱',
      content: <Input placeholder="请输入" />,
      name: 'email',
      extra: <span>测试extra</span>,
    },
    {
      label: '用户密码',
      content: <Input.Password placeholder="请输入" />,
      name: 'password',
      help: <span>测试help</span>,
    },
    {
      label: <ZpEllipsis style={{ width: '100%' }} text="用户名称" />,
      content: <Input placeholder="请输入" />,
      name: 'nickname',
      tooltip: 'What do you want others to call you?',
      rules: [
        {
          required: true,
          message: '请输入用户名称h',
        },
      ],
      labelWidth: 80,
    },
    {
      label: '联系电话',
      content: (
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入" />
      ),
      name: 'phone',
    },
    {
      label: (
        <ZpEllipsis
          style={{ width: '100%' }}
          text="测试label为长文本长文本长文本测试label为长文本长文本长文本测试label为长文本长文本长文本"
        />
      ),
      content: <Input placeholder="请输入" />,
      name: 'testLongText',
      rules: [
        {
          required: true,
          message: '测试label为长文本长文本长文本测试label为长文本长文本长文本测试label',
        },
      ],
    },
  ];
  return (
    <div>
      <ZpSearchForm
        Form={Form}
        form={form}
        formList={formList}
        colon={false}
        lastElement={lastElement}
      />
    </div>
  );
};
```

> 也可以设置属性`showExpand`是否开启收起展开功能

```tsx
import React from 'react';
import { ZpSearchForm, ZpEllipsis } from 'zp-design';
import { Input, Select, InputNumber, Form, Button } from 'antd';

export default () => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const lastElement = (
    <>
      <Button type="primary">查询</Button>
      <Button type="ghost">重置</Button>
    </>
  );

  const formList = [
    {
      label: '邮箱',
      content: <Input placeholder="请输入" />,
      name: 'email',
      extra: <span>测试extra</span>,
    },
    {
      label: '用户密码',
      content: <Input.Password placeholder="请输入" />,
      name: 'password',
      help: <span>测试help</span>,
    },
    {
      label: '用户名称',
      content: <Input placeholder="请输入" />,
      name: 'nickname',
      tooltip: 'What do you want others to call you?',
    },
    {
      label: '联系电话',
      content: (
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入" />
      ),
      name: 'phone',
    },
    {
      label: (
        <ZpEllipsis
          style={{ width: '100%' }}
          text="测试label为长文本长文本长文本测试label为长文本长文本长文本测试label为长文本长文本长文本"
        />
      ),
      content: <Input placeholder="请输入" />,
      name: 'testLongText',
    },
  ];
  return (
    <div>
      <ZpSearchForm
        formList={formList}
        colon={false}
        lastElement={lastElement}
        showExpand={false}
      />
    </div>
  );
};
```

## 简单查询功能

> 使用 `SimpleSearchForm` 组件可以实现简单的筛选功能， `title` 属性用于控制页面 `title` 的显示,`lastElement`用于控制页面上的操作按钮显示

```tsx
import React from 'react';
import { ZpSearchForm } from 'zp-design';
import { Input, Dropdown, Form, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { SimpleSearchForm } = ZpSearchForm;

export default () => {
  const menu = (
    <Menu
      items={[
        {
          label: '删除',
          key: '1',
        },
        {
          label: '修改',
          key: '2',
        },
        {
          label: '新增',
          key: '3',
        },
      ]}
    />
  );

  const lastElement = (
    <>
      <Form.Item noStyle name="searchText">
        <Input style={{ width: '200px' }} placeholder="请输入查询关键词" />
      </Form.Item>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          更多操作
          <DownOutlined />
        </Button>
      </Dropdown>
      <Button type="ghost">次要按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  );

  return <SimpleSearchForm title="测试简单查询功能" lastElement={lastElement} />;
};
```

## 简单查询和筛选的混合合使用

> 使用属性`showExpand`可开启二者的混合使用，此时，需要传`formList`用于控制下面的表单项的显示。使用属性`contentLaseElement`控制下方操作按钮的显示

```tsx
import React from 'react';
import { ZpSearchForm, ZpEllipsis } from 'zp-design';
import { Input, Dropdown, Form, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { SimpleSearchForm } = ZpSearchForm;

export default () => {
  const menu = (
    <Menu
      items={[
        {
          label: '删除',
          key: '1',
        },
        {
          label: '修改',
          key: '2',
        },
        {
          label: '新增',
          key: '3',
        },
      ]}
    />
  );

  const lastElement = (
    <>
      <Form.Item noStyle name="searchText">
        <Input style={{ width: '200px' }} placeholder="请输入查询关键词" />
      </Form.Item>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          更多操作
          <DownOutlined />
        </Button>
      </Dropdown>
      <Button type="ghost">次要按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  );

  const contentLaseElement = (
    <>
      <Button type="ghost">查询</Button>
      <Button type="ghost">重置</Button>
    </>
  );
  const formList = [
    {
      label: '邮箱',
      content: <Input placeholder="请输入" />,
      name: 'email',
      extra: <span>测试extra</span>,
    },
    {
      label: '用户密码',
      content: <Input.Password placeholder="请输入" />,
      name: 'password',
      help: <span>测试help</span>,
    },
    {
      label: '用户名称',
      content: <Input placeholder="请输入" />,
      name: 'nickname',
      tooltip: 'What do you want others to call you?',
    },
    {
      label: '联系电话',
      content: <Input style={{ width: '100%' }} placeholder="请输入" />,
      name: 'phone',
    },
    {
      label: (
        <ZpEllipsis
          style={{ width: '100%' }}
          text="测试label为长文本长文本长文本测试label为长文本长文本长文本测试label为长文本长文本长文本"
        />
      ),
      content: <Input placeholder="请输入" />,
      name: 'testLongText',
    },
  ];

  return (
    <SimpleSearchForm
      title="测试简单查询功能"
      colon={false}
      lastElement={lastElement}
      contentLaseElement={contentLaseElement}
      formList={formList}
      showExpand
    />
  );
};
```

## 使用后端配置

当用户配置`formConfig`属性时，表示表单的`顺序`，`显隐`和左`边显示的文字`可以有后端进行配置,[对应后端文档地址](https://czn22tcstw.feishu.cn/wiki/wikcnOeEejDtA9h7A7f7GeEz5qf)。对于此接口，该组件除必填项外，只用到了`itemOrder,hidden,label,itemName`等字段

```tsx
import React, { useCallback, useMemo } from 'react';
import { Input, Dropdown, Form, Button, Menu } from 'antd';
import { formListBase } from './foundation/const';
import { DownOutlined } from '@ant-design/icons';
import { ZpSearchForm, ZpEllipsis } from 'zp-design';
const { SimpleSearchForm } = ZpSearchForm;

export default () => {
  const formList = [
    {
      content: <Input placeholder="请输入" />,
      name: 'email',
      extra: <span>测试extra</span>,
    },
    {
      content: <Input.Password placeholder="请输入" />,
      name: 'password',
      help: <span>测试help</span>,
    },
    {
      content: <Input placeholder="请输入" />,
      name: 'nickname',
      tooltip: 'What do you want others to call you?',
    },
    {
      content: <Input style={{ width: '100%' }} placeholder="请输入" />,
      name: 'phone',
    },
    {
      content: <Input placeholder="请输入" />,
      name: 'testLongText',
      labelFormat: (text) => <ZpEllipsis style={{ width: '100%' }} text={text} />,
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          label: '删除',
          key: '1',
        },
        {
          label: '修改',
          key: '2',
        },
        {
          label: '新增',
          key: '3',
        },
      ]}
    />
  );
  const lastElement = (
    <>
      <Form.Item noStyle name="searchText">
        <Input style={{ width: '200px' }} placeholder="请输入查询关键词" />
      </Form.Item>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          更多操作
          <DownOutlined />
        </Button>
      </Dropdown>
      <Button type="ghost">次要按钮</Button>
      <Button type="primary">主要按钮</Button>
    </>
  );

  const contentLaseElement = (
    <>
      <Button type="ghost">查询</Button>
      <Button type="ghost">重置</Button>
    </>
  );

  const getFormConfigApi = () => {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(formListBase);
      }, 5000);
    });
  };

  return (
    <SimpleSearchForm
      title="测试简单查询功能-后端配置"
      colon={false}
      formConfig={{
        userId: '111',
        menuCode: '3333',
        getFormConfig: getFormConfigApi,
      }}
      lastElement={lastElement}
      contentLaseElement={contentLaseElement}
      formList={formList}
      showExpand
    />
  );
};
```

## API

### ZpSearchForm props

> 以下属性是查询表单的自定义参数，除此之外还支持 `antd form` 表单的所有属性

<API src="./api/ZpSearchFormProps.tsx" hideTitle></API>

> 其中 `FormItem` 和定义如下,`同时，FormItem` 也是基于 `antd` 的表单,所以也支持 `Form.Item` 的所有属性

<API src="./api/FormItem.tsx" hideTitle></API>

> `ConfigFormProps` 定义如下

<API src="./api/ConfigFormProps.tsx" hideTitle></API>

### SimpleSearchForm props

<API src="./api/SimpleSearchFormProps.tsx" hideTitle></API>
