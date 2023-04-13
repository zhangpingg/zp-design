import type {
  CommonConfigParamsProps,
  FormItemBaseProps,
} from '../../ZpConfigForm/interface';
import type { Form, FormItemProps, FormProps } from 'antd';
import type { ReactNode } from 'react';

export type PickFormItemBaseProp = Omit<
  FormItemBaseProps,
  'initValue' | 'layout' | 'areaType' | 'required'
>;

export type ConfigResponseItem = {
  title: string;
  children: PickFormItemBaseProp[];
};
export interface ConfigFormProps {
  /**
   * @description 用户id，微前端模式下为 window.store.getItem('userId')
   */
  userId: string;
  /**
   * @description 表单id，页面上有多个表单时的区分
   * @default formId
   */
  formId?: string;
  /**
   * @description 菜单id，微前端模式下一般为 window.tabs.getCurrentKey()
   */
  menuCode: string;

  /**
   * @description 获取表单项列表的接口
   * @default undefined
   */
  getFormConfig: (
    params: CommonConfigParamsProps,
  ) => Promise<ConfigResponseItem[]>;
}
export interface FormItemBase {
  /**
   * @description 表单项的label
   */
  label: ReactNode;
  /**
   * @description 表单项label的宽度，当label是string时可以不传
   */
  labelWidth?: number;
  /**
   * @description 表单的name,一个查询表单内需要不重复
   */
  name: string;

  /**
   * @description 表单项渲染的内容
   */
  content?: JSX.Element;

  /**
   * @description 在开后端表单配置时，需要自定义格式化label（比如ellipsis）
   */
  labelFormat?: (text: string) => ReactNode;
}

export type FormItem<Value = any> = FormItemBase &
  Omit<FormItemProps<Value>, 'name'>;

interface AppendBase {
  /**
   * @description 是否显示展开收起按钮，配置时开启高级筛选
   * @default true
   */
  showExpand?: boolean;

  /**
   * @description 跟随展开收起按钮的元素
   */
  lastElement?: JSX.Element;
}

interface FromCommonConfig<Value = any> {
  /**
   * @description 显示表单项的列表,受控属性，改变会更新表单数据
   */
  formList: FormItem<Value>[];

  /**
   * @description 需要检验必填项时，需要传入Form组件，（antd V4）
   */
  Form?: typeof Form;

  /**
   * @description 后端表单配置项，当配置该属性时，表示开后端配置，formList属性会和接口返回的数据进行合并
   */
  formConfig?: ConfigFormProps;
}

export type ZpSearchFormBase<Value = any> = AppendBase &
  FromCommonConfig<Value>;

export type ZpSearchFormProps<Value = any> = ZpSearchFormBase<Value> &
  FormProps<Value>;

export interface AppendBtnProps extends Partial<AppendBase> {
  isExpand: boolean;
  prefix: string;
  antPrefix: string;
  setIsExpand?: (flag: boolean) => any;
}

export interface SimpleSearchFormBase<Value = any>
  extends AppendBase,
    FromCommonConfig<Value> {
  /**
   * @description 页面title
   * @default '''
   */
  title: string;
  /**
   *@description 下拉属性中的按钮
   */
  contentLaseElement?: JSX.Element;
}

export type SimpleSearchFormProps<Value = any> = FormProps<Value> &
  SimpleSearchFormBase<Value>;

export interface SearchFormItemContentProps<Value = any> extends AppendBase {
  formList: FormItem<Value>[];
  Form?: typeof Form;
  span: number;
  resetLabelWidht: (width: number) => any;
}
