/**
 * 数字格式化-千分符格式化
 * @param num 输入数
 * @param precision 精度
 * @param autoFill 是否自动补0
 */
const formatNum = (num, precision = 8, autoFill = false) => {
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  if ([null, undefined].includes(num)) {
    return '';
  }
  const _num = String(num);
  const _suffix = autoFill ? Array(precision).fill(0).join('') : '';
  if (/\.{1}/g.test(_num)) {
    const arr = _num.split('.');
    return `${arr[0].replace(reg, ',')}.${`${arr[1]}${_suffix}`.substring(0, precision)}`;
  }
  if (autoFill) {
    return `${_num.replace(reg, ',')}.${_suffix}`;
  } else {
    return `${_num.replace(reg, ',')}`;
  }
};

/**
 * 计算小数点位数的长度
 * @param {number | string} num 输入的数字
 * @returns {number} 返回小数点的长度
 */
function decimalLength(num) {
  const eSplit = String(num).split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision = 15) {
  return +parseFloat(Number(num).toPrecision(precision));
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {number | string} num 输入数
 */
function decimalToInt(num) {
  if (num.toString().indexOf('e') > -1) {
    const dLen = decimalLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  return Number(String(num).replace('.', ''));
}
/**
 * 递归操作
 * @param {number | string} nums 计算数的数组
 * @param {Function} operation 操作的方法
 * @returns 返回最后的计算结果
 */
function recursionOperation(nums, operation) {
  return nums.reduce((prev, cur) => operation(prev, cur));
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(
      `${num} is beyond boundary when transfer to integer, the results may not be accurate`,
    );
  }
}

/** 精确加法 */
const plus = (...nums) => {
  if (nums.length > 2) {
    return recursionOperation(nums, plus);
  }
  const [num1, num2] = nums;
  const accBase = 10 ** Math.max(decimalLength(num1), decimalLength(num2)); // 精度基数
  return (accMul(num1, accBase) + accMul(num2, accBase)) / accBase;
};
/** 精确减法 */
const accReduce = (...nums) => {
  if (nums.length > 2) {
    return recursionOperation(nums, accReduce);
  }
  const [num1, num2] = nums;
  const accBase = 10 ** Math.max(decimalLength(num1), decimalLength(num2));
  return (accMul(num1, accBase) - accMul(num2, accBase)) / accBase;
};
/** 精确乘法 */
const accMul = (...nums) => {
  if (nums.length > 2) {
    return recursionOperation(nums, accMul);
  }
  const [num1, num2] = nums;
  const num1Int = decimalToInt(num1);
  const num2Int = decimalToInt(num2);
  const accBase = 10 ** (decimalLength(num1) + decimalLength(num2));
  const resInt = num1Int * num2Int;
  checkBoundary(resInt);
  return resInt / accBase;
};
/** 精确除法 */
const accDiv = (...nums) => {
  if (nums.length > 2) {
    return recursionOperation(nums, accDiv);
  }
  const [num1, num2] = nums;
  const num1Int = decimalToInt(num1);
  const num2Int = decimalToInt(num2);
  checkBoundary(num1Int);
  checkBoundary(num2Int);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return accMul(num1Int / num2Int, strip(Math.pow(10, decimalLength(num2) - decimalLength(num1))));
};

export { formatNum, plus, accReduce, accMul, accDiv };
