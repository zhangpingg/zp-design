export const formList1 = [
  {
    title: '标题1',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName1', // key (唯一值)
        label: '产品名称一', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: null, // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '产品代码',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '类型',
        itemOrder: 3,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
    ],
  },
  {
    title: '标题2',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productName2',
        label: '产品名称二',
        itemOrder: 1,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
    ],
  },
];
export const formList2 = [
  {
    title: '',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName1', // key (唯一值)
        label: '产品名称一', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: null, // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '产品代码',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '类型',
        itemOrder: 3,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'address',
        label: '联系地址',
        itemOrder: 5,
        hidden: 1,
        initValue: null,
        layout: 24,
        areaType: 2,
      },
    ],
  },
  {
    title: '',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productName2',
        label: '产品名称二',
        itemOrder: 1,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'date',
        label: '日期',
        itemOrder: 4,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 2,
        required: 1,
      },
    ],
  },
];

export const formList3 = [
  {
    title: '',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName', // key (唯一值)
        label: '产品名称', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: null, // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '产品代码',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '类型',
        itemOrder: 3,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
        // required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'dateRange',
        label: '日期范围文案很多很多很多',
        itemOrder: 6,
        hidden: 1,
        initValue: null,
        layout: 16,
        areaType: 1,
        required: 1,
      },
    ],
  },
];

export const formList4 = [
  {
    title: '标题1',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName', // key (唯一值)
        label: '产品名称一', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: '产品1', // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '产品代码',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '类型一',
        itemOrder: 3,
        hidden: 1,
        initValue: '2',
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'date',
        label: '日期一',
        itemOrder: 4,
        hidden: 1,
        initValue: '2022-01-01',
        layout: 8,
        areaType: 1,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'address',
        label: '联系地址',
        itemOrder: 5,
        hidden: 1,
        initValue: null,
        layout: 24,
        areaType: 2,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'dateRange',
        label: '日期范围文案很多很多很多',
        itemOrder: 6,
        hidden: 1,
        initValue: null,
        layout: 16,
        areaType: 1,
        required: 1,
      },
    ],
  },
  {
    title: '标题2',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName2', // key (唯一值)
        label: '产品名称二', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: '产品2', // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type2',
        label: '类型二',
        itemOrder: 3,
        hidden: 1,
        initValue: '2',
        layout: 8,
        areaType: 2,
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'date2',
        label: '日期二',
        itemOrder: 4,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 2,
        required: 1,
      },
    ],
  },
];

export const formList5 = [
  {
    title: '标题1',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName1', // key (唯一值)
        label: '产品名称', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: null, // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '文案',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '文案文',
        itemOrder: 3,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
    ],
  },
  {
    title: '标题2',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productName2',
        label: '文案文案文案文案文1234',
        itemOrder: 1,
        hidden: 1,
        initValue: null,
        layout: 24,
        areaType: 1,
      },
    ],
  },
];

export const formList6 = [
  {
    title: '标题1',
    children: [
      {
        userId: 1, // 用户 id
        menuCode: 'MENU001', // 菜单 id
        formId: 'form01', // 表单 id
        itemName: 'productName1', // key (唯一值)
        label: '文', // 表单项左侧文字
        itemOrder: 1, // 顺序
        hidden: 1,
        initValue: null, // 默认值（非必填）
        layout: 8, // 表单项布局
        areaType: 1, // 表单项所在的区域类型 1:显示区域(默认)、2:更多区域
        required: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productCode',
        label: '文案',
        itemOrder: 2,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'type',
        label: '文案文',
        itemOrder: 3,
        hidden: 1,
        initValue: null,
        layout: 8,
        areaType: 1,
      },
    ],
  },
  {
    title: '标题2',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'empytChunk',
      },
    ],
  },
  {
    title: '标题3',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'productName2',
        label: '文案文案文案文案文1234',
        itemOrder: 1,
        hidden: 1,
        initValue: null,
        layout: 24,
        areaType: 1,
      },
    ],
  },
  {
    title: '标题4',
    children: [
      {
        userId: 1,
        menuCode: 'MENU001',
        formId: 'form01',
        itemName: 'empytChunk',
      },
    ],
  },
];
