import React, {
  FC,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  memo,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { ZpContext } from '../ZpConfigProvider';
import { getTextWidth } from '../../utils/str';
import ZpEllipsis from '../ZpEllipsis';
import { ConfigProvider, Row, Col, Spin, Button, Empty, Form as AntdForm } from 'antd';
import HeaderTitle from './part/HeaderTitle';
import {
  ZpConfigFormProps,
  FormItemProps,
  MergeListProps,
  FormItemBaseProps,
  RuleItemProps,
  configItemProps,
  FormListItemProps,
} from './interface';
import { useUpdateEffect } from 'ahooks';
import classnames from 'classnames';
import _ from 'lodash';
import './foundation/index.less';

const ZpConfigForm: FC<ZpConfigFormProps> = (props) => {
  let { prefix = 'zp', antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  const {
    commonConfig,
    formList = [],
    chunkList = [],
    formatDefVal,
    lastElement,
    showTitle = true,
    showTitleIcon = true,
    Form,
    labelAntPrefix,
    readOnly = false,
    ...lastFormProps
  } = props;
  const FormWrap = readOnly ? AntdForm : Form;
  const FormItemWrap = readOnly ? AntdForm.Item : Form.Item;
  const _labelAntPrefix = readOnly ? 'zp-ant' : labelAntPrefix;
  const { getFormConfig, ...paramsProps } = commonConfig;
  const divRef = useRef<HTMLDivElement>(null);
  const [configList, setConfigList] = useState<configItemProps[]>([]); // 接口返回的配置的列表
  const [formAllList, setFormAllList] = useState<FormItemBaseProps[]>([]); // 给计算label宽度用
  const [mergeList, setmergeList] = useState<MergeListProps[]>([]); // 给页面循环用
  const [loading, setLoading] = useState<boolean>(false);
  const [moreFlagList, setMoreFlagList] = useState<string[]>([]); // 存储打开了哪些更多的内容

  /** 文案盒子宽度 */
  const getTextWrapperWidth = useCallback((textWidth, isRequired, isTooltip) => {
    let res: number = textWidth;
    if (isRequired) {
      res += 2;
    }
    if (isTooltip) {
      res += 20;
    }
    return res;
  }, []);
  /** 获取 rules 中的 required*/
  const getRulesRequire = useCallback(
    (item: Partial<FormItemProps & { rules?: RuleItemProps[] }>) => {
      let rulesRequire = false;
      const rulesList = item?.rules || [];
      rulesList.forEach((rItem: RuleItemProps) => {
        if (rItem.required) {
          rulesRequire = true;
        }
      });
      return rulesRequire;
    },
    [],
  );
  /** 根据formAllList，获取 label 宽度（label 宽度为当前表单 label 的最大值，且最大值不超过 96px） */
  const labelWidth = useMemo(() => {
    const arr = formAllList.map((v: FormItemBaseProps) => {
      return getTextWrapperWidth(
        getTextWidth(v.label),
        !!v.required || getRulesRequire(v),
        !!v.tooltip,
      );
    });
    const max = Math.max(...arr);
    return Math.min(96, max);
  }, [formAllList]);
  /** 真正的文字占位宽度 */
  const getRealTextWidth = useCallback(
    (textWidth, isRequired, isTooltip) => {
      let maxWidth = String(labelWidth) !== '-Infinity' ? labelWidth : 96;
      let realTextWidth: number = textWidth;
      if (isRequired) {
        maxWidth -= 2;
      }
      if (isTooltip) {
        maxWidth -= 20;
      }
      return Math.min(maxWidth, realTextWidth);
    },
    [labelWidth],
  );
  /** 设置label宽度 */
  const setLabelStyle = useCallback(
    (labelWidth: number) => {
      setTimeout(() => {
        const className = `.${_labelAntPrefix}-form-item-label`;
        const itemLabel = divRef.current?.querySelectorAll(className);
        Array.from(itemLabel || []).map((item) => {
          (item as HTMLElement).style.width = labelWidth + 14 + 'px';
        });
      });
    },
    [_labelAntPrefix],
  );
  /** 设置 form 默认值 */
  const setFormValue = useCallback((list: FormItemBaseProps[]) => {
    const defaultValObj: { [key in string]: string } = {};
    list.forEach((item) => {
      if (item.initValue) {
        defaultValObj[item?.itemName] = item.initValue;
      }
    });
    const result = formatDefVal ? formatDefVal(defaultValObj) : defaultValObj;
    lastFormProps?.form?.setFieldsValue(result);
  }, []);
  /** 合并表单列表 */
  const mergeConfigFormList = useCallback(
    (isFirstTime: boolean) => {
      if (configList.length === 0) {
        return;
      }
      let allList: FormItemBaseProps[] = [];
      const tempList = configList.map((itemBlock) => {
        const _itemBlock: any = _.cloneDeep(itemBlock);
        _itemBlock.children = _itemBlock.children?.map((item: FormItemBaseProps) => {
          const singleItemList = formList.filter((el) => el.itemName === item.itemName);
          allList.push(item);
          return { ...item, ...singleItemList[0] };
        });
        _itemBlock.showList = _itemBlock.children?.filter((el: FormItemProps) => {
          if (el.areaType === 1) {
            el.required = readOnly ? 0 : el.required;
            return el;
          }
        });
        _itemBlock.hideList = _itemBlock.children?.filter((el: FormItemProps) => {
          if (el.areaType === 2) {
            el.required = readOnly ? 0 : el.required;
            return el;
          }
        });
        _itemBlock.showMore = _itemBlock?.hideList?.length > 0;
        _itemBlock.moreFlag = !moreFlagList.includes(_itemBlock.title);
        if (_itemBlock.children.length === 1 && _itemBlock.children[0].itemName == 'empytChunk') {
          _itemBlock.chunkFlag = true;
        }
        return _itemBlock;
      });
      setmergeList(tempList);
      setFormAllList(allList);
      setLabelStyle(labelWidth);
      if (isFirstTime && !readOnly) {
        setFormValue(allList);
      }
    },
    [configList, formList, mergeList, moreFlagList],
  );
  /** 获取表单项列表 */
  const getFormList = useCallback(async () => {
    try {
      setLoading(true);
      const res: configItemProps[] = await getFormConfig(paramsProps);
      setConfigList(res);
    } catch (err: unknown) {
      // console.log(err?.message);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }, [getFormConfig, paramsProps, formList]);
  /** 循环的模块 */
  const loopItem = (
    { itemName, hidden, layout, required, label, component, ...lastItemProps }: any,
    listType: string,
    showMore: boolean = false,
  ) => {
    const laseTtemObj: Partial<FormItemProps> = _.omit({ ...lastItemProps }, [
      'menuCode',
      'formId',
      'userCode',
      'initValue',
      'areaType',
      'userId',
      'itemOrder',
      'title',
    ]);
    if (hidden === 0) return null;
    return (
      <Col
        span={layout}
        key={itemName}
        className={classnames({
          [`${prefix}-zp-config-form-col`]: true,
          [`${prefix}-zp-config-form-col-hideList`]: listType === 'hideList' && showMore,
        })}
      >
        <FormItemWrap
          label={
            <ZpEllipsis
              text={label}
              style={{
                width: getRealTextWidth(
                  getTextWidth(label),
                  !!required || getRulesRequire(laseTtemObj),
                  !!laseTtemObj.tooltip,
                ),
              }}
            />
          }
          name={itemName}
          rules={[
            {
              required: !!required || getRulesRequire(laseTtemObj),
              message: `请输入${label}`,
            },
          ]}
          className={classnames({
            [`${prefix}-zp-config-form-col-form-item`]: true,
            [`${prefix}-zp-config-form-col-form-item-read`]: readOnly,
          })}
        >
          {component}
        </FormItemWrap>
      </Col>
    );
  };
  /** 切换更多 */
  const changeMore = useCallback((index) => {
    setmergeList((prev) => {
      const tempList = [...prev];
      tempList[index].moreFlag = !tempList[index].moreFlag;
      setMoreFlagList((prev) => {
        let tempPrev = [...prev];
        if (!tempPrev.includes(tempList[index].title)) {
          tempPrev.push(tempList[index].title);
        } else {
          tempPrev.splice(tempPrev.indexOf(tempList[index].title), 1);
        }
        return tempPrev;
      });
      return tempList;
    });
  }, []);

  /** 监听labelWidth变化，重新设置label文案宽度 */
  useUpdateEffect(() => {
    setLabelStyle(labelWidth);
  }, [labelWidth]);
  useUpdateEffect(() => {
    mergeConfigFormList(false);
  }, [formList]);
  useUpdateEffect(() => {
    mergeConfigFormList(true);
  }, [configList]);

  useEffect(() => {
    getFormList();
  }, []);

  return (
    <ConfigProvider prefixCls={antPrefix} {...antdConfigProvider}>
      <Spin spinning={loading}>
        {mergeList.length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div ref={divRef} className={`${prefix}-zp-config-form-wrapper`}>
            <FormWrap {...lastFormProps}>
              {mergeList.map((itemBlock: MergeListProps, index) => (
                <div
                  key={index}
                  className={classnames({
                    [`${prefix}-zp-config-form-line`]: !itemBlock.title || !showTitle,
                  })}
                >
                  <HeaderTitle
                    prefix={prefix}
                    title={itemBlock.title}
                    showTitle={showTitle}
                    showTitleIcon={showTitleIcon}
                    titleId={`${paramsProps?.formId + index}`}
                    readOnly
                  >
                    {itemBlock.chunkFlag ? (
                      chunkList.length > 0 &&
                      chunkList.splice(0, 1).map((itemChunk: { component: ReactNode }, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                          {itemChunk.component}
                        </div>
                      ))
                    ) : (
                      <>
                        <Row gutter={24}>
                          {itemBlock.showList?.map((item) => loopItem(item, 'showList'))}
                          {itemBlock.hideList?.map((item) =>
                            loopItem(item, 'hideList', itemBlock.moreFlag),
                          )}
                        </Row>
                        {itemBlock.showMore && (
                          <div className={`${prefix}-more-btn`}>
                            <Button type="link" onClick={() => changeMore(index)}>
                              {itemBlock.moreFlag ? '更多' : '收起'}
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </HeaderTitle>
                </div>
              ))}
            </FormWrap>
            {lastElement}
          </div>
        )}
      </Spin>
    </ConfigProvider>
  );
};

export default memo(ZpConfigForm);
