import { ZpNumberBaseProps } from '../../ZpNumber/interface';

export type ZpNumberRangeProps = {
  /**
   * @description 表单 Form，由外部传入，以便收集数据，正确的错误提示等
   * @default
   */
  Form: any;
  /**
   * @description 单位的下拉选项
   * @default
   */
  unitOptions: Object;
  /**
   * @description 单位的默认值
   * @default
   */
  defaultUnit?: string;
  /**
   * @description 每个输入框的控制情况，具体可以查看当前示例和 ZpNumber 组件API
   * @default []
   */
  list?: ZpNumberBaseProps[];
  /**
   * @description 当使用业务组件的时候，该字段必传，传父级的 Form.item 的 name 值
   * @default
   */
  fatherName?: string;
};
