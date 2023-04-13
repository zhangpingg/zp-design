import LessPluginFunctions from 'less-plugin-functions';
import commonJs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.ts',
  esm: {
    type: 'rollup',
    minify: false,
  },
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
  extraRollupPlugins: [commonJs()],
  lessInRollupMode: {
    javascriptEnabled: true,
    modifyVars: {
      'ant-prefix': 'zp-ant',
      'font-size-base': '12px',
    },
    plugins: [new LessPluginFunctions({ alwaysOverride: true })],
  },
  extractCSS: true,
  runtimeHelpers: true,
  replace: {
    VERSION: JSON.stringify(require('./package').version),
  },
};
