import React, { FC, memo, useContext, useMemo, useState, useRef, useCallback } from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDomSizeChange } from 'zp-component-library';
import { ZpContext } from '../ZpConfigProvider';
import { ZpViewTextProps } from './interface';
import cn from 'classnames';
import './foundation/index.less';

const ZpViewText: FC<ZpViewTextProps> = (props) => {
  const { text, isEllipsis = false, rowEllipsis = 2, style } = props || {};
  const { prefix = 'zp' } = useContext(ZpContext);
  const realNodeRef = useRef<HTMLDivElement>(null);
  const [isShowMoreIcon, setIsShowMoreIcon] = useState<Boolean>(false); // 更多按钮按钮，展开|收起
  const [isOpenText, setIsOpenText] = useState<Boolean>(false); // 文字折叠收起的控制
  const [webkitLineClamp, setWebkitLineClamp] = useState<number | undefined>(); // 展示几行

  /** 行高的限制条件 */
  const lineHeightLimit = (lineHT: number) => {
    if (lineHT > 42) return 42;
    if (lineHT < 18) return 18;
    if (lineHT % 2) return lineHT + 1;
    return lineHT || 18;
  };
  /** 真实DOM行高 */
  const realDomlineHT = useMemo(() => {
    if (realNodeRef && realNodeRef.current) {
      const cssStyle = getComputedStyle(realNodeRef.current);
      const lineHT = parseInt(cssStyle.getPropertyValue('line-height'));
      return lineHeightLimit(lineHT);
    }
    return 18;
  }, [realNodeRef?.current]);

  /** 初始化时处理省略以及展开收起按钮的逻辑（总的高度、行高） */
  const handleRowEllipsis = useCallback(
    (offsetHT: number) => {
      const rowNum = parseInt(`${rowEllipsis}`);
      const relHT = realDomlineHT * rowNum;
      if (offsetHT - relHT > 10) {
        // 需要展开收起按钮时（显示...时）
        setIsShowMoreIcon(true);
        setWebkitLineClamp(rowNum);
        setIsOpenText(false);
      } else {
        // 文字未展示...时不用展示展开收起按钮
        setIsShowMoreIcon(false);
        setWebkitLineClamp(99999999);
      }
    },
    [realDomlineHT, rowEllipsis],
  );
  /** 切换展开收起 */
  const changeIsOpenStatus = useCallback(() => {
    setIsOpenText((status) => {
      if (status) {
        setWebkitLineClamp(rowEllipsis);
      } else {
        setWebkitLineClamp(99999999);
      }
      return !status;
    });
  }, [rowEllipsis]);
  /** 更多按钮—展开|收起 */
  const moreBtn = useMemo(() => {
    if (isEllipsis && isShowMoreIcon) {
      return (
        <div onClick={changeIsOpenStatus} className={`${prefix}-text-view-main-more`}>
          <Button type="link" className={`${prefix}-text-view-main-more-btn`}>
            {!isOpenText ? '展开' : '收起'}
          </Button>
          <DownOutlined
            className={cn({
              [`${prefix}-text-view-main-more-icon`]: isOpenText,
            })}
          />
        </div>
      );
    }
    return null;
  }, [isEllipsis, isShowMoreIcon, changeIsOpenStatus, isOpenText]);

  /** 给用户看的文本样式 */
  const viewStyle = useMemo(() => {
    if (isEllipsis) {
      return {
        WebkitLineClamp: webkitLineClamp,
        lineHeight: `${realDomlineHT}px`,
        ...style,
      };
    }
    return style;
  }, [style, webkitLineClamp, isEllipsis, realDomlineHT]);
  /** 真实的dom节点渲染但不显示出来—获取其行高、高度等用于后面计算 */
  const realNode = useMemo(() => {
    if (isEllipsis) {
      return (
        <div ref={realNodeRef} className={`${prefix}-text-view-real-text`} style={style}>
          {text}
        </div>
      );
    }
    return null;
  }, [isEllipsis, style]);

  /** 监听 dom 宽度变化时重新处理展开/收起按钮的逻辑 */
  useDomSizeChange(
    realNodeRef,
    (dom: HTMLElement) => {
      if (isEllipsis && text) {
        const offsetHT = dom.offsetHeight || 0; // 真实DOM总的高度：content + padding + border
        handleRowEllipsis(offsetHT);
      }
    },
    [handleRowEllipsis, isEllipsis, text],
  );

  return (
    <div className={`${prefix}-view-text-wrap`}>
      <div className={`${prefix}-text-view`}>
        {realNode}
        <div
          style={viewStyle}
          className={cn({
            [`${prefix}-text-view-main`]: true,
            [`${prefix}-text-view-main-line-height-${realDomlineHT}`]: isEllipsis,
          })}
          title={text}
        >
          {moreBtn}
          {text}
        </div>
      </div>
    </div>
  );
};

export default memo(ZpViewText);
