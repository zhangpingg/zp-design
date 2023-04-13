import React, { FC, useState } from 'react';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { HeaderTitleProps } from '../interface';
import classnames from 'classnames';

const HeaderTitle: FC<HeaderTitleProps> = (props) => {
  const {
    prefix,
    title,
    showTitle = true,
    showTitleIcon = true,
    children,
    titleId,
    readOnly,
  } = props;
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div className={`${prefix}-zp-config-form-title-wrapper`}>
      {!!title && showTitle && (
        <div className={`${prefix}-zp-config-form-title`}>
          <span
            className={classnames({
              [`${prefix}-zp-config-form-title-content`]: true,
              [`${prefix}-zp-config-form-title-content-weight`]: readOnly,
            })}
            id={titleId}
          >
            {title}
          </span>
          {showTitleIcon && (
            <div
              className={`${prefix}-zp-config-form-title-icon-wrapper`}
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? (
                <MinusSquareOutlined
                  className={`${prefix}-zp-config-form-title-icon`}
                />
              ) : (
                <PlusSquareOutlined
                  className={`${prefix}-zp-config-form-title-icon`}
                />
              )}
            </div>
          )}
        </div>
      )}
      <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>
    </div>
  );
};

export default HeaderTitle;
