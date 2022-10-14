import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Dropdown, Checkbox, Button, ConfigProvider, message, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  SettingOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { DraggableProvided } from 'react-beautiful-dnd';
import { ZpContext } from '../ZpConfigProvider';
import { ZpDragBox } from 'zp-component-library';
// import DragBox from './dragBox';
import { sortList } from './const';
import { DragItemProps, AlignProps } from './interface';
import './foundation/index.less';

const DragList = () => {
  let { prefix, antPrefix, antdConfigProvider } = useContext(ZpContext);
  message.config({
    prefixCls: `${antPrefix}-message`,
  });
  const [visible, setVisible] = useState(false);
  const [initAllCols, setInitAllCols] = useState<DragItemProps[]>([]); // 初始化时的所有列数据
  const [leftCols, setLeftCols] = useState<DragItemProps[]>([]); // 左侧固定列
  const [middleCols, setMiddleCols] = useState<DragItemProps[]>([]); // 中间列
  const [rightCols, setRightCols] = useState<DragItemProps[]>([]); // 右侧固定列

  /** 全选的 checkbox 勾选状态 */
  const allChecked = useMemo(() => {
    const dragList = middleCols.filter((v) => !v.disabled); // 过滤掉不可拖拽的项，不然后续勾选全选的时候会有逻辑冲突
    return !!dragList.length && dragList.every((v) => v.checked);
  }, [middleCols]);

  /** 设置左中右列列表数据 */
  const setColsList = useCallback((list: DragItemProps[]) => {
    setLeftCols([...list.filter((v) => v.fixed === 'left')]); // 左固定的列
    setMiddleCols([...list.filter((v) => !v.fixed)]); // 中间不固定的列
    setRightCols([...list.filter((v) => v.fixed === 'right')]); // 右固定的列
  }, []);
  /** 获取配置列表 */
  const getConfigList = useCallback(() => {
    setColsList(sortList);
    setInitAllCols(sortList);
  }, []);
  /** 拖拽项的 checkbox 勾选事件（只有中间是可拖拽的） */
  const changeItemCheckbox = useCallback(
    (dataIndex: string, e: CheckboxChangeEvent) => {
      setMiddleCols((prev) => {
        return prev.map((item: DragItemProps) => ({
          ...item,
          checked: item.dataIndex === dataIndex ? e.target.checked : item.checked,
        }));
      });
    },
    [middleCols],
  );
  /** 全选的 change 事件 */
  const checkAllChange = (e: CheckboxChangeEvent) => {
    setMiddleCols((prev) => {
      return prev.map((item: DragItemProps) => ({
        ...item,
        checked: item.disabled ? item.checked : e.target.checked,
      }));
    });
  };
  /** 确定 */
  const confirm = useCallback(() => {
    const allCols = [...leftCols, ...middleCols, ...rightCols];
    const confirmList = allCols.filter((v) => v.checked);
    if (!confirmList.length) {
      message.warning('配置列不能为空，请重新配置！');
      return;
    }
    // 调接口保存
    console.log('数据', allCols);
    setInitAllCols(allCols);
    setVisible(false);
  }, [leftCols, middleCols, rightCols]);
  /** 重置 */
  const clickReset = useCallback(() => {
    setColsList(initAllCols);
  }, [initAllCols]);
  /** 弹框显隐事件（当弹框打开的时候，回显上一次确定时保存的数据） */
  const setDropDownVisible = (visible: boolean) => {
    if (visible) {
      setColsList(initAllCols); // 回显上一次保存的数据
    }
    setVisible(visible);
  };

  useEffect(() => {
    getConfigList();
  }, []);

  /** 设置固定列组（左中右） */
  const setListSequence = (current: AlignProps, to: AlignProps, item: DragItemProps) => {
    const customMap = {
      left: leftCols,
      center: middleCols,
      right: rightCols,
      setleft: setLeftCols,
      setcenter: setMiddleCols,
      setright: setRightCols,
    };
    const newCurrentList = [...customMap[to]];
    if (to === 'left') {
      newCurrentList.push({
        ...item,
        fixed: 'left',
        disabled: true,
        checked: true,
      });
    } else if (to === 'right') {
      newCurrentList.unshift({
        ...item,
        fixed: 'right',
        disabled: true,
        checked: true,
      });
    } else {
      const currentNode = { ...item, fixed: undefined, disabled: false };
      current === 'left' ? newCurrentList.unshift(currentNode) : newCurrentList.push(currentNode);
    }
    // 设置当前
    const currentList = customMap[current].filter((v) => v.dataIndex !== item.dataIndex);
    customMap[`set${current}`]?.(currentList); // 来源列表重新设置
    customMap[`set${to}`]?.(newCurrentList); // 去向列表重新设置
  };
  /** 可拖拽的每一项 item - 按钮（置未坐中右列） */
  const dragItemBtn = (align: AlignProps, item: DragItemProps) => {
    return (
      <div style={{ margin: '0 8px', width: '16px' }} className={`${prefix}-drag-item-btn`}>
        {['center', 'right'].includes(align) && (
          <Tooltip title="固定在左侧">
            <VerticalAlignTopOutlined
              className={`${prefix}-btn`}
              onClick={() => setListSequence(align, 'left', item)}
            />
          </Tooltip>
        )}
        {['left', 'right'].includes(align) && (
          <Tooltip title="不固定">
            <VerticalAlignMiddleOutlined
              className={`${prefix}-btn`}
              onClick={() => setListSequence(align, 'center', item)}
            />
          </Tooltip>
        )}
        {['left', 'center'].includes(align) && (
          <Tooltip title="固定在右侧">
            <VerticalAlignBottomOutlined
              className={`${prefix}-btn`}
              onClick={() => setListSequence(align, 'right', item)}
            />
          </Tooltip>
        )}
      </div>
    );
  };
  /** 可拖拽的每一项 item */
  const dragItem = (align: AlignProps) => (item: DragItemProps, provided: DraggableProvided) => {
    return (
      <div
        className={classNames(`${prefix}-drag-item`, {
          [`${prefix}-drag-item-not`]: item.disabled,
        })}
        key={item.dataIndex}
        ref={provided.innerRef}
        {...provided.draggableProps}
      >
        <HolderOutlined />
        <Checkbox
          style={{ margin: '0 8px' }}
          disabled={item.disabled}
          checked={item.checked}
          onChange={(e) => changeItemCheckbox(item.dataIndex, e)}
        />
        <span className={`${prefix}-drag-item-text`} {...provided.dragHandleProps}>
          {item.title}
        </span>
        {dragItemBtn(align, item)}
      </div>
    );
  };
  /** 可拖拽内容的盒子-标题 */
  const dragBoxTitle = useCallback((align: string) => {
    let title = '';
    switch (align) {
      case 'left':
        title = '固定在左侧';
        break;
      case 'center':
        title = '不固定';
        break;
      case 'right':
        title = '固定在右侧';
        break;
    }
    return <div className={`${prefix}-drag-list-main-title`}>{title}</div>;
  }, []);
  /** 可拖拽内容的盒子 */
  const dragBox = (list: DragItemProps[], align: AlignProps) => {
    if (!list.length) return null;
    return (
      <div>
        {dragBoxTitle(align)}
        <ZpDragBox
          id={align}
          uniqKey="dataIndex"
          dragList={list}
          render={dragItem(align)}
          dragEndCb={setMiddleCols}
        />
      </div>
    );
  };
  /** Dropdown 的下拉内容 */
  const dropdownMain = () => {
    return (
      <div className={`${prefix}-drag-list`}>
        <div className={`${prefix}-drag-list-header`}>
          <Checkbox checked={allChecked} onChange={checkAllChange}>
            全选
          </Checkbox>
        </div>
        <div className={`${prefix}-drag-list-main`}>
          {dragBox(leftCols, 'left')}
          {dragBox(middleCols, 'center')}
          {dragBox(rightCols, 'right')}
        </div>
        <div className={`${prefix}-drag-list-footer`}>
          <Button type="ghost" onClick={() => clickReset()}>
            重置
          </Button>
          <Button type="primary" onClick={confirm}>
            确定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <ConfigProvider prefixCls={antPrefix} {...antdConfigProvider}>
      <Dropdown
        trigger={['click']}
        overlay={dropdownMain}
        visible={visible}
        onVisibleChange={setDropDownVisible}
        placement="bottomLeft"
      >
        <SettingOutlined />
      </Dropdown>
    </ConfigProvider>
  );
};

export default DragList;
