import { ZpContext } from '../../ZpConfigProvider';
import { getTextWidth } from '../../../utils/str';
import { Col, Form as AntForm, Row } from 'antd';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import { SearchFormItemContentProps } from '../interface';
import AppendBtn from './AppendBtn';

// 普通筛选的表单体
const SearchFormItemContent = (props: SearchFormItemContentProps) => {
  const { prefix = 'zp', antPrefix = 'zp-ant' } = useContext(ZpContext);

  const {
    formList,
    span,
    lastElement,
    showExpand,
    resetLabelWidht,
    Form = AntForm,
  } = props;

  const [isExpand, setIsExpand] = useState<boolean>(false);

  /** label 宽度，最大取96 */
  const labelWidth = useMemo(() => {
    const widhts = formList.map((v) => {
      if (typeof v.label === 'string') {
        return getTextWidth(v.label || '');
      }
      // 如果二者都不对，会抛出错误
      if (v.labelWidth === undefined) {
        console.warn(
          '当表单项的label为RectNode时，请手动传入labelWidth以方便组件计算表单项的统一宽度',
        );
        return 96;
      }
      return v.labelWidth;
    });
    // 最大是
    return Math.min(96, Math.max(...widhts));
  }, [formList]);

  /** 展开或者收起时，需要显示的数据不一样 */
  const showFormList = useMemo(() => {
    if (!showExpand || isExpand) {
      return [...formList];
    }
    // 每行2个，只显示1个
    if (span === 12) {
      return [...formList.slice(0, 1)];
    }
    // 每行3个，只显示2个
    if (span === 8) {
      return [...formList.slice(0, 2)];
    }
    return [...formList.slice(0, 3)];
  }, [formList, isExpand, span, showExpand]);

  /** 当前显示的表单项的key，所有表单项都需要全部渲染，不然表单检验和设置值不生效 */
  const showFormItemKey = useMemo(() => {
    return showFormList.map((v) => v.name);
  }, [showFormList]);

  /** 延迟设定label宽度 */
  useEffect(() => {
    resetLabelWidht(labelWidth);
  }, [showFormList, labelWidth]);

  /** 设置后续操按钮的offest */
  const appendOffset = useMemo(() => {
    const rowNum = 24 / span;
    const remainder = showFormList.length % rowNum;
    const offset = rowNum - remainder;
    if (offset === 0) {
      return (rowNum - 1) * span;
    }
    return (offset - 1) * span;
  }, [showFormList, span]);

  const doShowExpand = useMemo(() => {
    if (!showExpand) {
      return false;
    }
    // span 6  8 12
    const formLen = formList.length;
    if (
      (span === 8 && formLen >= 3) ||
      (span === 6 && formLen >= 4) ||
      (span === 12 && formLen >= 2)
    ) {
      return true;
    }
    return false;
  }, [formList, span]);

  return (
    <Row gutter={24}>
      {formList.map(({ label, content, name, ...formItemProps }) => {
        const showItem = showFormItemKey.includes(name);
        const colSpan = showItem ? span : 0;
        return (
          <Col span={colSpan} key={name}>
            <Form.Item {...formItemProps} label={label} name={name}>
              {content}
            </Form.Item>
          </Col>
        );
      })}
      {!doShowExpand && !lastElement ? null : (
        <Col span={span} offset={appendOffset}>
          <AppendBtn
            showExpand={doShowExpand}
            lastElement={lastElement}
            isExpand={isExpand}
            setIsExpand={setIsExpand}
            prefix={prefix}
            antPrefix={antPrefix}
          />
        </Col>
      )}
    </Row>
  );
};

export default SearchFormItemContent;
