import { ZpContext } from '../../ZpConfigProvider';
import useGridLayout from '../../../hooks/useGirdLayout';
import { ConfigProvider, Form as AntForm, Spin } from 'antd';
import React, { useContext, useRef } from 'react';
import '../foundation/index.less';
import { ZpSearchFormProps } from '../interface';
import SearchFormItemContent from './SearchFormItemContent';
import useRewriteForm from '../hooks/useRewriteForm';
import useRealConfig from '../hooks/useRealConfig';

const SearchForm = (props: ZpSearchFormProps) => {
  let { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);

  const {
    formList,
    showExpand = true,
    lastElement,
    Form = AntForm,
    form,
    formConfig,
    ...formProps
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [col] = useGridLayout(wrapperRef); // 计算一行放几个
  const [relFormList, isLoading] = useRealConfig(formList, formConfig); // 真正最终的表单项列表

  const [formNew, setLabelStyle] = useRewriteForm(
    {
      wrapperRef,
      antPrefix,
    },
    form,
  );

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div ref={wrapperRef} className={`${prefix}-search-from-wrapper`}>
        <Form {...formProps} form={formNew}>
          <Spin spinning={isLoading}>
            <SearchFormItemContent
              formList={relFormList}
              showExpand={showExpand}
              span={col}
              resetLabelWidht={setLabelStyle}
              lastElement={lastElement}
              Form={Form}
            />
          </Spin>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default SearchForm;
