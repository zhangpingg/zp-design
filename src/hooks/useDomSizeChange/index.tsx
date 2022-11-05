import { useEffect, useMemo, useRef } from 'react';
import { throttle } from 'lodash';

const useDomSizeChange = (
  dom: { current: Element | null },
  cb: (...set: any[]) => any,
  deps?: any[],
  debounceTimmer = 300,
) => {
  const depsRef = useRef<any>([]);

  /** 节流 */
  const throttleCb = throttle((target: Element) => {
    cb?.(target, ...depsRef.current);
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
  }, [dom, ...(deps || [])]);
  useEffect(() => {
    depsRef.current = deps || [];
  }, deps || []);

  return null;
};

export default useDomSizeChange;
