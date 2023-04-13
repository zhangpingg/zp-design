import { useEffect, useMemo, useState } from 'react';
import {
  transformConfigForm2FormList,
  vaildateCommonConfig,
} from '../foundation';
import { ConfigFormProps, FormItem, PickFormItemBaseProp } from '../interface';

const useRealConfig = <Value = any>(
  formList: FormItem<Value>[],
  formConfig?: ConfigFormProps,
) => {
  const [searchFormConfig, setSearchFormConfig] = useState<typeof formList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const flag = vaildateCommonConfig(formConfig); // 检查是否配置了 commonConfig
    const { getFormConfig, userId = '', menuCode = '', formId = 'formId' } =
      formConfig || {};

    if (flag) {
      setIsLoading(true);
      getFormConfig?.({ userId, menuCode, formId })
        .then((res) => {
          const reslist: PickFormItemBaseProp[] = [];

          res.reduce((pre, cur) => {
            if (cur.children) {
              pre.push(...cur.children);
            }
            return pre;
          }, reslist) || [];
          // 合并后台配置的列表和前端的表单项列表
          const list = transformConfigForm2FormList(reslist, formList);
          setSearchFormConfig(list);
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // 真正渲染的form表单项列表
  const relFormList = useMemo(() => {
    const flag = vaildateCommonConfig(formConfig);

    if (flag === undefined) {
      return formList || [];
    }

    if (!flag) {
      return [];
    }
    return searchFormConfig;
  }, [formList, formConfig, searchFormConfig]);

  return [relFormList, isLoading] as const;
};

export default useRealConfig;
