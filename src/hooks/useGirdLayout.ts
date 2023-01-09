//  计算栅格系统的参数，动态返回当前一行应该显示几个，

import { useMemo, useState } from 'react';
import useDomSizeChange from './useDomSizeChange';

const useGridLayout = (dom: { current: Element | null }) => {
  const [pageWidth, setPageWidth] = useState<number>(1300);
  // 监听外层盒子变化
  useDomSizeChange(dom, (current: Element) => {
    const { clientWidth } = current;
    setPageWidth(clientWidth);
  });

  // 响应式规范 <1200显示两列，<1600显示3列，>1600，显示4列
  const col = useMemo(() => {
    if (pageWidth < 1200) {
      return 12;
    }
    if (pageWidth < 1600) {
      return 8;
    }
    return 6;
  }, [pageWidth]);

  return [col];
};

export default useGridLayout;
