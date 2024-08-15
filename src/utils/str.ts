/**
 * @description 计算字符串在元素中的宽度（使用canvas进行计算，如果不支持canvas，直接返回text.length*字体大小）
 * @param text 需要测量的文本
 * @param font 字体大小,需要传px的字符串，默认为12px
 * @returns 字符串应该的宽度
 */
const getTextWidth = (
  text: string,
  font = '12px',
  fontFamily?: string | undefined,
): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const currentFontFamily =
    fontFamily || getComputedStyle(document.body).fontFamily;
  if (!context) {
    return text.length * (Number(font.replace('px', '')) || 12);
  }
  context.font = `${font} ${currentFontFamily}`;
  const metrics = context.measureText(text);
  return metrics.width;
};

export { getTextWidth };
