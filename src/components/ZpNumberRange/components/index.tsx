import React, { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider, Input, Select } from 'antd';
import ZpNumber from '../../ZpNumber';
import { ZpContext } from '../../ZpConfigProvider';
import { ZpNumberRangeProps } from '../interface';
import '../foundation/index.less';

const ZpNumberRange: FC<ZpNumberRangeProps> = (props) => {
  const { list = [], unitOptions = {}, defaultUnit, Form } = props;
  const form = Form?.useFormInstance();
  const { formItemAttr: formItemAttr1, ...lastProps1 } = list?.[0];
  const { formItemAttr: formItemAttr2, ...lastProps2 } = list?.[1];
  const { formItemAttr: formItemAttr3 } = list?.[2];
  const { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  const [rangeObj, setRangeObj] = useState({});
  const [illegalSize, setIllegalSize] = useState(false);

  /** 单位的选项 */
  const transUnitOptions = useMemo(
    () =>
      Object.keys(unitOptions).map((key) => ({
        label: unitOptions[key],
        value: key,
      })),
    [unitOptions],
  );
  /** 校验大小-失败的提示 */
  const failMessage = useMemo(() => {
    if (!illegalSize) {
      return {};
    }
    return {
      validateStatus: 'error',
      help: '开始值要小于结束值',
    };
  }, [illegalSize]);
  const changeNum = useCallback(
    (origin: string, val: string) => {
      setRangeObj((prev) => {
        const tempPrev = {
          ...prev,
          [origin == 'start' ? formItemAttr1?.name?.[1] : formItemAttr2?.name?.[1]]: val,
        };
        if (
          !!tempPrev[formItemAttr1?.name?.[1]] &&
          !!tempPrev[formItemAttr2?.name?.[1]] &&
          Number(tempPrev[formItemAttr1?.name?.[1]]) > Number(tempPrev[formItemAttr2?.name?.[1]])
        ) {
          setIllegalSize(true);
        } else {
          setIllegalSize(false);
        }
        return tempPrev;
      });
    },
    [formItemAttr1, formItemAttr2, rangeObj],
  );
  /** 单位的DOM */
  const unitDom = (
    <Form.Item noStyle {...formItemAttr3}>
      <Select options={transUnitOptions} />
    </Form.Item>
  );

  useEffect(() => {
    form?.setFieldsValue({
      [formItemAttr3.name[0]]: {
        [formItemAttr3.name[1]]: defaultUnit,
      },
    });
  }, [JSON.stringify(transUnitOptions), defaultUnit]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div className={`${prefix}-zp-number-range-wrapper`}>
        <Form.Item {...formItemAttr1} {...failMessage}>
          <ZpNumber
            onlyInt
            {...lastProps1}
            className={`${prefix}-zp-number-range-start`}
            onChange={(v: string) => changeNum('start', v)}
          />
        </Form.Item>
        <div>
          <Input
            className={`${prefix}-zp-number-range-split`}
            style={{
              width: 30,
              borderLeft: 0,
              borderRight: 0,
              pointerEvents: 'none',
            }}
            placeholder="~"
            disabled
          />
        </div>
        <Form.Item {...formItemAttr2} {...failMessage}>
          <ZpNumber
            onlyInt
            {...lastProps2}
            className={`${prefix}-zp-number-range-end`}
            onChange={(v: string) => changeNum('end', v)}
            addonAfter={unitOptions ? unitDom : null}
          />
        </Form.Item>
      </div>
    </ConfigProvider>
  );
};

export default memo(ZpNumberRange);
