import classNames from 'classnames';
import React from 'react';
import { memo } from 'react';
import { AppendBtnProps } from '../interface';
import ExpantBtn from './ExpandBtn';
// 按钮项
const AppendBtn = memo((props: AppendBtnProps) => {
  const {
    showExpand,
    lastElement,
    isExpand = false,
    prefix,
    antPrefix,
    setIsExpand,
  } = props;
  if (!showExpand && !lastElement) {
    return null;
  }

  return (
    <div
      className={classNames(
        `${antPrefix}-form-item`,
        `${prefix}-search-form-append-wrapper`,
        `${prefix}-btngroup-wrapper`,
      )}
    >
      {showExpand ? (
        <ExpantBtn
          prefix={prefix}
          isExpand={isExpand}
          setIsExpand={setIsExpand}
        />
      ) : null}
      {lastElement ? lastElement : null}
    </div>
  );
});

export default AppendBtn;
