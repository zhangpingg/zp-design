import React, { FC, memo, useEffect, useContext } from 'react';
import ZpNumber from '../components';
import { ZpContext } from '../../ZpConfigProvider';
import { ConfigProvider, Checkbox } from 'antd';
import '../foundation/index.less';

const CustomComponentA: FC<any> = (props) => {
  const { list = [], Form } = props;
  const form = Form?.useFormInstance();
  const { formItemAttr: formItemAttr1, lastProps1 } = list?.[0];
  const { formItemAttr: formItemAttr2, lastProps2 } = list?.[1];
  const { formItemAttr: formItemAttr3, lastProps3 } = list?.[2];
  const { prefix = 'zp', antPrefix, antdConfigProvider } = useContext(
    ZpContext,
  );

  useEffect(() => {
    form.setFieldsValue({
      customA: {},
    });
  }, []);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-zp-number-custom-a-wrapper`}>
        <div className={`${prefix}-zp-number-custom-a-input`}>
          <Form.Item {...formItemAttr1}>
            <ZpNumber precision={4} unit="元" {...lastProps1} />
          </Form.Item>
        </div>
        <span className={`${prefix}-zp-number-custom-a-diagonal`}>/</span>
        <div className={`${prefix}-zp-number-custom-a-input`}>
          <Form.Item {...formItemAttr2}>
            <ZpNumber precision={2} unit="%" {...lastProps2} />
          </Form.Item>
        </div>
        <div className={`${prefix}-zp-number-custom-a-linkage`}>
          <Form.Item valuePropName="checked" {...formItemAttr3}>
            <Checkbox {...lastProps3}>联动</Checkbox>
          </Form.Item>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default memo(CustomComponentA);
