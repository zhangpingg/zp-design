import { Form } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import FormList from 'antd/lib/form/FormList';
import useFormInstance from 'antd/lib/form/hooks/useFormInstance';
import ErrorList from 'antd/lib/form/ErrorList';
import BaseForm from './BaseForm';

// 我们还要用给Form包裹一层，直接导出不会带这几个方法
type ZpBaseForm = typeof BaseForm;
interface ZpFormProps extends ZpBaseForm {
  useForm: typeof useForm;
  Item: typeof FormItem;
  useWatch: typeof useWatch;
  List: typeof FormList;
  useFormInstance: typeof useFormInstance;
  ErrorList: typeof ErrorList;
}

const ZpForm = BaseForm as ZpFormProps;

ZpForm.Item = Form.Item;
ZpForm.useForm = Form.useForm;
ZpForm.useWatch = Form.useWatch;
ZpForm.List = Form.List;
ZpForm.useFormInstance = Form.useFormInstance;
ZpForm.ErrorList = Form.ErrorList;

export default ZpForm;
