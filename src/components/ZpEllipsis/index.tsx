import { getTextWidth } from '@/utils/str';
import React, {
  CSSProperties,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tooltip, ConfigProvider } from 'antd';
import { ZpContext } from '../ZpConfigProvider';
import './foundation/index.less';
import useDomSizeChange from '../../hooks/useDomSizeChange';
import classNames from 'classnames';
import type { EllpsisWrapperProps, ZpEllipsisProps } from './interface';

const EllpsisWrapper = memo(
  (props: EllpsisWrapperProps): JSX.Element => {
    const {
      maxWidth,
      text,
      prefix,
      ellipsisRow = 1,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onClick,
      render,
    } = props;

    const wrapperPrefix = `${prefix}-ellpsis`;

    const wrapperStyle = useMemo(() => {
      if (ellipsisRow === 1) {
        return undefined;
      }
      const style: CSSProperties = {
        WebkitLineClamp: ellipsisRow,
      };
      return style;
    }, [ellipsisRow]);

    return (
      <div
        style={{ maxWidth: maxWidth, ...wrapperStyle }}
        className={classNames(
          `${wrapperPrefix}-wrapper`,
          ellipsisRow === 1
            ? `${wrapperPrefix}-single`
            : `${wrapperPrefix}-mutil`,
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onClick={onClick}
      >
        {render?.(text) ?? text}
      </div>
    );
  },
);

const ZpEllipsis = (props: ZpEllipsisProps): JSX.Element => {
  let { prefix, antPrefix, antdConfigProvider } = useContext(ZpContext);

  const {
    text,
    fontSize = '12px',
    ellipsisRow = 1,
    style,
    render,
    ...toolTipProps
  } = props;

  const [textWidth, setTextWidth] = useState<number>(0);  // 内容的宽度
  const [maxWidth, setMaxWidth] = useState<number>(0);    // 盒子的宽度
  const wrapperRef = useRef<HTMLDivElement>(null);

  /** 获取外框的宽度 */
  useDomSizeChange(wrapperRef, (dom: HTMLDivElement) => {
    const { clientWidth } = dom;
    setMaxWidth(clientWidth);
  });
  /** 计算字体宽度 */
  useEffect(() => {
    const fontWidth = getTextWidth(text || '', fontSize);
    setTextWidth(fontWidth);
  }, [text, fontSize]);
  /** 是否显示tooltip */
  const showToolTips = useMemo(() => {
    if (ellipsisRow === 1) {
      return textWidth > maxWidth;
    }
    if (maxWidth === 0 || ellipsisRow === 0) {
      return false;
    }
    // 文本宽度如果超出能显示下的最大内容宽度，则显示tooltip,多行文本时存在误差，导致原因是剩下的宽度放不下一个字时，会换行
    return Math.ceil(textWidth / (ellipsisRow * maxWidth)) > 1;
  }, [maxWidth, textWidth, ellipsisRow]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <div ref={wrapperRef} style={{ ...style }}>
        {showToolTips ? (
          <Tooltip {...toolTipProps} title={text}>
            <EllpsisWrapper
              text={text}
              prefix={prefix}
              render={render}
              maxWidth={maxWidth}
              ellipsisRow={ellipsisRow}
            />
          </Tooltip>
        ) : (
          <EllpsisWrapper
            text={text}
            prefix={prefix}
            maxWidth={maxWidth}
            ellipsisRow={ellipsisRow}
            render={render}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default ZpEllipsis;
