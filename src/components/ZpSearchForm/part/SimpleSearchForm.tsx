// 简单查询

import { ZpContext } from '../../ZpConfigProvider';
import { ConfigProvider, Form as AntForm, Spin } from 'antd';
import React, { FC, useContext, useRef, useState } from 'react';
import { SimpleSearchFormProps } from '../interface';
import '../foundation/index.less';
import AppendBtn from './AppendBtn';
import useGridLayout from '../../../hooks/useGirdLayout';
import classNames from 'classnames';
import SearchFormItemContent from './SearchFormItemContent';
import useRewriteForm from '../hooks/useRewriteForm';
import useRealConfig from '../hooks/useRealConfig';

const SimpleSearchForm: FC<SimpleSearchFormProps> = (props) => {
  const { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  const classPrefix = `${prefix}-simple-search-form`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [col] = useGridLayout(wrapperRef);
  const {
    title,
    showExpand = false,
    lastElement,
    formList,
    contentLaseElement,
    Form = AntForm,
    form = undefined,
    formConfig,
    ...formProps
  } = props;
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const [formNew, setLabelStyle] = useRewriteForm(
    {
      wrapperRef,
      antPrefix,
    },
    form,
  );

  const [relFormList, isLoading] = useRealConfig(formList, formConfig);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div ref={wrapperRef} className={`${prefix}-simple-search-form-wrapper`}>
        <Form form={formNew} {...formProps}>
          <Spin spinning={isLoading}>
            <div className={`${classPrefix}-top`}>
              <span className={classNames(`${classPrefix}-page-title`, `${antPrefix}-form-item`)}>
                {title}
              </span>
              <AppendBtn
                showExpand={showExpand}
                lastElement={lastElement}
                isExpand={isExpand}
                setIsExpand={setIsExpand}
                prefix={prefix}
                antPrefix={antPrefix}
              />
            </div>
            {showExpand ? (
              <div style={{ display: isExpand ? 'block' : 'none' }}>
                <SearchFormItemContent
                  formList={relFormList}
                  span={col}
                  resetLabelWidht={setLabelStyle}
                  showExpand={false}
                  lastElement={contentLaseElement}
                  Form={Form}
                />
              </div>
            ) : null}
          </Spin>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default SimpleSearchForm;
