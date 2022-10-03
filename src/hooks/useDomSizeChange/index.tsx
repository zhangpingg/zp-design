import { useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

const useDomSizeChange = (
  dom: { current: Element | null },
  cb: (...set: any[]) => any,
  debounceTimmer = 300,
) => {
  /** 节流 */
  const throttleCb = throttle((target: Element) => {
    cb?.(target);
  }, debounceTimmer);

  const obsever = useMemo(() => {
    if (obsever) {
      obsever.disconnect();
    }

    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        throttleCb(entry.target);
      }
    });
  }, []);

  useEffect(() => {
    if (dom?.current) {
      obsever.observe(dom.current);
    }
    return () => obsever.disconnect();
  }, [dom]);

  return null;
};

export default useDomSizeChange;
