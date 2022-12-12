export const businessControlTypeList = [
  {
    label: '券面总额',
    value: 'ParGrossAmount',
    description: '保留2位小数，单位“万元”',
  },
  {
    label: '净价',
    value: 'NetPrice',
    description: '整数位数15位，保留4位小数，自动补0，单位“元”',
  },
  {
    label: '全价',
    value: 'FullPrice',
    description: '整数位数15位，保留4位小数，自动补0，单位“元”',
  },
  {
    label: '结算金额',
    value: 'ClearingAmount',
    description: '保留2位小数，单位“元”，不可编辑',
  },
  {
    label: '应计利息',
    value: 'AccruedInterest',
    description: '保留2位小数，单位“元”',
  },
  {
    label: '行权收益率',
    value: 'ExerciseYields',
    description: '整数位数7位，保留4位小数，单位“%”',
  },
  {
    label: '到期收益率',
    value: 'MaturityYields',
    description: '整数位数7位，保留4位小数，单位“%”',
  },
];
