// dom 大小改变时的回调，返回当前元素本身
import { useEffect, useCallback, MutableRefObject } from 'react';
import { debounce } from 'lodash';

const useDom = (dom: MutableRefObject<any>, cb: (dom: Element) => void) => {
  const debunceCb = useCallback(
    debounce((target: Element) => cb?.(target), 300),
    [],
  );
  const obsever = new ResizeObserver((entries) => {
    for (const entry of entries) {
      debunceCb(entry.target);
    }
  });

  useEffect(() => {
    if (dom?.current) {
      obsever.observe(dom.current);
    }
    return () => obsever.disconnect();
  }, [dom]);

  return null;
};

export default useDom;
