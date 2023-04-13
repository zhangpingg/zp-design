import type {
  ConfigFormProps,
  FormItem,
  PickFormItemBaseProp,
} from '../interface';

/** 检查公共配置 CommonConfig */
export function vaildateCommonConfig(commonConfig?: ConfigFormProps) {
  if (!commonConfig) {
    return undefined;
  }
  const { userId, menuCode, getFormConfig } = commonConfig;

  if (commonConfig && (!userId || !menuCode || !getFormConfig)) {
    console.warn('你配置了formConfig，但是其中存在必填项未填，请检查');
    return false;
  }
  return true;
}

/** 合并后台配置的表单项列表和前端传入的表单项列表 */
export function transformConfigForm2FormList<Value = any>(
  list: PickFormItemBaseProp[],
  selfConfig: FormItem<Value>[],
): FormItem<Value>[] {
  const rlist = list.filter((item) => item.hidden + '' !== '0'); // 显示，后端已做过排序

  return (
    rlist?.map((item) => {
      const userConfig = selfConfig.find((v) => v.name === item.itemName);
      const format = userConfig?.labelFormat;
      return {
        ...userConfig,
        label: format?.(item.label) ?? item.label,
        name: item.itemName,
      };
    }) || []
  );
}
