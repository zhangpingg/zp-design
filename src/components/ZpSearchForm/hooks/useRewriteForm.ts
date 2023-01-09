// 重写form的reset函数，解决重置时清除label宽度问题
import { RefObject, useMemo, useRef } from 'react';
import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';

const useRewriteForm = (
  config: {
    antPrefix?: string;
    wrapperRef: RefObject<HTMLElement>;
  },
  form?: FormInstance,
): [FormInstance | undefined, (a: number) => void] => {
  const { antPrefix = 'zp-ant', wrapperRef } = config;
  // 记录label宽度
  const labelWidthRef = useRef<number>(0);

  // 重新设置 label 宽度
  const setLabelStyle = (labelWidth: number) => {
    labelWidthRef.current = labelWidth;
    setTimeout(() => {
      const className = `.${antPrefix}-form-item-label`;
      const itemLabel = wrapperRef.current?.querySelectorAll(className);

      Array.from(itemLabel || []).map((item) => {
        (item as HTMLElement).style.width = labelWidth + 14 + 'px';
      });
    });
  };

  const newForm = useMemo(() => {
    if (form) {
      const oldResetFields = form.resetFields;
      form.resetFields = (fields?: NamePath[] | undefined) => {
        oldResetFields(fields);
        setLabelStyle(labelWidthRef.current);
      };
    }
    return form;
  }, [form]);
  return [newForm, setLabelStyle];
};

export default useRewriteForm;
