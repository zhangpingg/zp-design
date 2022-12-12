/* eslint-disable no-useless-escape */
import React, { FC, useCallback, useRef, useState, useContext, useEffect } from 'react';
import { ZpContext } from '../../ZpConfigProvider';
import { ConfigProvider, Input } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { ZpNumberProps } from '../interface';
import '../foundation/index.less';

const ZpNumber: FC<ZpNumberProps> = (props) => {
  const { antPrefix = 'zp-ant', antdConfigProvider } = useContext(ZpContext);
  const {
    placeholder = '请输入',
    intDigits,
    precision,
    autoFill = false,
    unit,
    onlyInt = false,
    style,
    value,
    ...lastProps
  } = props;
  let commaNum = 0;
  const [num, setNum] = useState(value);
  const isChangeValflag = useRef(false);
  const inputRef = useRef<HTMLInputElement | any>(null);

  /** 去除非法输入字符串 */
  const removeIllegalStr = useCallback(
    (val: string) => {
      let reg = null;
      if (onlyInt) {
        reg = /[^\d^]+/g; // 只能输入数字
      } else {
        reg = /[^\d^\.]+/g; // 只能输入数字、小数点
      }
      return val.replace(reg, '');
    },
    [onlyInt],
  );
  /** 当0在首位的时候，则去除0 */
  const removeFirstZero = useCallback((str: string) => {
    if (str.length > 1) {
      const list = str.split('');
      if (list[0] === '0' && list[1] !== '.') {
        list.splice(0, 1);
      }
      return list.join('');
    }
    return str;
  }, []);
  /** 截取数字 */
  const interceptNum = useCallback((str: string, length: number | undefined) => {
    let res = str;
    if (!!length && res.length > length) {
      res = res.substring(0, length);
    }
    return res;
  }, []);
  /** 格式化千分位 */
  const formatter = useCallback(
    (val: string | number) => {
      let res = '';
      const tempVal = String(val);
      if (tempVal.indexOf('.') > -1) {
        let integer = tempVal.split('.')[0];
        let decimal = tempVal.split('.')[1];
        integer = interceptNum(integer, intDigits);
        decimal = interceptNum(decimal, precision);
        res = `${integer}.${decimal}`;
      } else {
        res = interceptNum(tempVal, intDigits);
      }
      return res
        .toString()
        .replace(/\d+/, (num) => num.replace(/(\d)(?=(\d{3})+$)/g, ($1) => `${$1},`));
    },
    [intDigits, precision],
  );
  /** 清空逗号 */
  const clearComma = useCallback((val: string) => {
    if (!val) {
      return '';
    }
    return val.replace(/\$\s?|(,*)/g, '');
  }, []);
  /** 获取逗号的个数 */
  const getCommaNum = useCallback((str: string) => {
    const num = str.split('').filter((item) => item === ',').length;
    if (commaNum === num) {
      return 0;
    }
    commaNum = num;
    return 1;
  }, []);
  /** 输入框的 change 事件 */
  const onChangeFn = useCallback((e: any) => {
    const inputNode = inputRef?.current?.input;
    const pStart = inputNode?.selectionStart; // 光标开始位置
    const pEnd = inputNode?.selectionEnd; // 光标结束位置
    const risAfter = removeIllegalStr(e?.target?.value); // 去除非法输入后的值
    const rfzAfter = removeFirstZero(risAfter); // 去除首位是0后的值
    const forStrAfter = formatter(rfzAfter); // 千分位格式化后的值
    setNum(forStrAfter); // 存本地，给用户展示看的
    isChangeValflag.current = true;
    lastProps?.onChange?.(clearComma(rfzAfter)); // 回传给父级的
    setTimeout(() => {
      const addNum = getCommaNum(forStrAfter);
      inputNode?.setSelectionRange(pStart + addNum, pEnd + addNum);
      inputNode?.focus();
    }, 0);
  }, []);
  /** 焦点失去事件 */
  const onBlurFn = useCallback(
    (e: any, flag = true) => {
      if (!e) {
        return;
      }
      const blurVal = flag ? e?.target?.value : e;
      if (precision && autoFill && blurVal !== '') {
        let decimal = '';
        const list = blurVal.split('.');
        const integer = clearComma(list[0]);
        decimal = (list[1] || '').padEnd(precision, '0');
        let res = `${formatter(integer)}.${decimal}`;
        res = formatter(String(Number(clearComma(res)).toFixed(precision)));
        setNum(res);
      }
      if (!autoFill) {
        const list = blurVal.split('.');
        const integer = clearComma(list[0]);
        const res = !list[1] ? formatter(integer) : `${formatter(integer)}.${list[1]}`;
        setNum(res);
      }
      if (blurVal) {
        lastProps?.onChange?.(clearComma(blurVal));
        lastProps?.onBlur?.(clearComma(blurVal));
      }
      isChangeValflag.current = false;
    },
    [precision, autoFill],
  );

  useUpdateEffect(() => {
    onBlurFn(num, false);
  }, [precision]);

  useEffect(() => {
    if (!value) {
      return;
    }
    if (precision && autoFill && !isChangeValflag.current) {
      onBlurFn(String(value), false);
    } else {
      setNum(formatter(String(value)));
    }
  }, [value, isChangeValflag]);

  return (
    <ConfigProvider {...antdConfigProvider} prefixCls={antPrefix}>
      <Input
        value={num}
        autoComplete="off"
        placeholder={placeholder}
        addonAfter={unit}
        {...lastProps}
        onChange={onChangeFn}
        onBlur={onBlurFn}
        style={style}
        ref={inputRef}
      />
    </ConfigProvider>
  );
};

export default ZpNumber;
