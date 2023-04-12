import path from 'path';
import LessPluginFunctions from 'less-plugin-functions';

export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: {
    type: 'rollup',
    minify: false,
  },

  // 发布的时候，下面全部要注释掉，后续需要修改下
  entry: 'src/index.ts',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  // extraRollupPlugins: [commonJs()],
  lessInRollupMode: {
    javascriptEnabled: true,
    modifyVars: {
      'ant-prefix': 'ant',
      'font-size-base': '12px',
      hack: `true; @import (reference) "${path.resolve('src/styles/override.less')}";`,
    },
    plugins: [new LessPluginFunctions({ alwaysOverride: true })],
  },
  extractCSS: true,
  runtimeHelpers: true,
  replace: {
    VERSION: JSON.stringify(require('./package').version),
  },
};
