import React, { useState, useCallback } from 'react';
import { ZpDebounceButton } from 'zp-component-library';

const DemoInterface = () => {
  const [data, setDate] = useState<any>();

  /** 模拟接口 */
  const fn2API = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('后台数据');
      }, 2000);
    });
  }, []);
  /** 防抖按钮点击事件 */
  const fn1 = useCallback(async () => {
    const res = await fn2API();
    setDate(res);
  }, []);

  return (
    <div>
      <p>结果：{data}</p>
      <ZpDebounceButton type="primary" time={1000} onClick={fn1}>
        防抖按钮
      </ZpDebounceButton>
    </div>
  );
};
export default DemoInterface;
