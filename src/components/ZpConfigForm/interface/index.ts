import { ReactNode } from 'react';
import type { FormProps } from 'antd';

export interface FormItemBaseProps {
  /**
   * @description 用户 id
   * @default
   */
  userId: string;
  /**
   * @description 菜单 id
   * @default
   */
  menuCode: string;
  /**
   * @description 表单 id
   * @default
   */
  formId: string;
  /**
   * @description 表单项的key (唯一值) <br /> 前端根据该字段匹配相应的自定义组件
   * @default
   */
  itemName: string;
  /**
   * @description 表单项左侧文字
   * @default
   */
  label: string;
  /**
   * @description 表单项的渲染顺序
   * @default
   */
  itemOrder: number;
  /**
   * @description 是否隐藏 <br /> 1:显示 0:隐藏
   * @default 0
   */
  hidden: number;
  /**
   * @description 表单项的默认值，用于回显数据
   * @default
   */
  initValue: string;
  /**
   * @description 表单项布局<br /> 6：占整行的1/4 <br /> 8：占整行的1/3<br /> 12：占整行的1/2<br /> 16：占整行的2/3<br />20：占整行的5/6 <br />24：占整行
   * @default
   */
  layout: number;
  /**
   * @description 表单项所在的区域类型 <br /> 1:显示区域 2:更多区域
   * @default 1
   */
  areaType: number;
  /**
   * @description 是否必填 <br /> 0:非必填 1:必填
   * @default 0
   */
  required: number;
  /**
   * @description 说明提示
   * @default
   */
  tooltip?: Object;
  /**
   * @description 该项是否必填，主要是控制*
   * @default
   */
  rules?: RuleItemProps[];
}
export interface FormItemComponentProps {
  itemName: string;
  /**
   * @description 自定义组件,如果是readOnly模式下,这里传相应的文本即可
   * @default
   */
  component: JSX.Element;
  tooltip?: Object;
}

export type FormItemProps = Omit<FormItemBaseProps, 'userId' | 'menuCode' | 'formId'> &
  FormItemComponentProps;

export type FormListItemProps = Partial<FormItemProps> & FormItemComponentProps;

export type MergeListProps = {
  title: string;
  children: FormItemProps[];
  showList?: FormItemProps[];
  hideList?: FormItemProps[];
  showMore?: boolean;
  moreFlag?: boolean;
  chunkFlag?: boolean;
};
export type HeaderTitleProps = {
  prefix: string;
  title: string;
  showTitle?: boolean;
  showTitleIcon?: boolean;
  titleId: string;
  readOnly: boolean;
  children?: ReactNode;
};
export type RuleItemProps = {
  required: boolean;
  message?: string;
};
export type configItemProps = {
  title: string;
  children: FormItemBaseProps[];
};

/** 获取form配置的参数属性 */
export interface CommonConfigParamsProps {
  /**
   * @description 用户 id
   */
  userId: string;
  /**
   * @description 菜单编号
   */
  menuCode: string;
  /**
   * @description  表单 id
   */
  formId: string;
  /**
   * @description 获取表单项列表的接口
   * @default
   */
}
export type CommonConfigProps = CommonConfigParamsProps & {
  /**
   * @description 获取表单项列表的接口
   * @default
   */
  getFormConfig: (params: CommonConfigParamsProps) => Promise<configItemProps[]>;
};
export interface ZpConfigFormBaseProps {
  /**
   * @description 公共配置模块，接口api，入参
   * @default
   */
  commonConfig: CommonConfigProps;
  /**
   * @description 表单项的匹配的自定义前端组件列表
   * @default []
   */
  formList: FormItemProps[];
  /**
   * @description 表单 Form，由外部传入，以便收集数据，正确的错误提示等
   * @default
   */
  Form: any;
  /**
   * @description 格式化数据，方便数据正确回显
   * @default
   */
  formatDefVal?: (params: { [key in string]: string }) => object;
  /**
   * @description 表单最后的元素，即提交按钮
   * @default
   */
  lastElement?: ReactNode;
  /**
   * @description 是否显示块级标题
   * @default true
   */
  showTitle?: boolean;
  /**
   * @description 是否显示块级标题后面的 icon
   * @default true
   */
  showTitleIcon?: boolean;
  /**
   * @description 业务项目的antd前缀，方便给表单项重新设置label样式，当readOnly为false时必传，true时可不传
   * @default
   */
  labelAntPrefix: string;
  /**
   * @description 是否只读，即查看详情,当为true的时候，Form,labelAntPrefix不用传
   * @default false
   */
  readOnly?: boolean;
  /**
   * @description 分块标题下方大模块的自定义内容列表
   * @default
   */
  chunkList?: Array<{ component: ReactNode }>;
}

export type ZpConfigFormProps = ZpConfigFormBaseProps & FormProps;
