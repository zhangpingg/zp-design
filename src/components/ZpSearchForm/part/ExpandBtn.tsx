import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { memo } from 'react';

// 展开按钮
interface ExpantBtnProps {
  prefix: string;
  setIsExpand?: (flag: boolean) => any;
  isExpand: boolean;
}

const ExpantBtn = (props: ExpantBtnProps) => {
  const { prefix, setIsExpand, isExpand } = props;
  return (
    <span className={`${prefix}-btn`} onClick={() => setIsExpand?.(!isExpand)}>
      {isExpand ? (
        <span>
          收起
          <UpOutlined style={{ marginLeft: '4px' }} />
        </span>
      ) : (
        <span>
          展开
          <DownOutlined style={{ marginLeft: '4px' }} />
        </span>
      )}
    </span>
  );
};

export default memo(ExpantBtn);
