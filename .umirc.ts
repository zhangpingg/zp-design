import { defineConfig } from 'dumi';
import LessPluginFunctions from 'less-plugin-functions';
import path from 'path';
import WebpackChain from 'webpack-chain';

const COMMON_URL = 'http://ip:8762'; // osp开发环境

const XONE_API = 'http://ip:8020'; // xone开发环境

// 重新配置less-loader，使其能够换肤
const LessLoaderConfig = (config: WebpackChain) => {
  const rule = config.module.rule('less');
  const cssModule = rule.oneOf('css-modules');
  const css = rule.oneOf('css');
  // 删除less-loader
  cssModule.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));
  css.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));

  // 重新添加 less-loader
  const options = {
    lessOptions: {
      modifyVars: {
        'ant-prefix': 'zp-ant',
        'font-size-base': '12px',
      },
      javascriptEnabled: true,
      plugins: [new LessPluginFunctions({ alwaysOverride: true })],
      math: 'always',
    },
  };
  // 增加thread-loader ，加快编译速度
  cssModule
    .use('less-loader')
    .loader('less-loader')
    .options({ ...options });

  css
    .use('less-loader')
    .loader('less-loader')
    .options({ ...options });
};

export default defineConfig({
  title: 'zp-design',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  mode: 'site',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  alias: {
    '@': 'src',
  },
  proxy: {
    '/common-api': {
      target: COMMON_URL,
      changeOrigin: true,
      pathRewrite: { '^/common-api': '/' },
    },
    '/xone-api': {
      target: XONE_API,
      // changeOrigin: true,
      // pathRewrite: { '^/xone-api': '/' },
    },
  },
  extraBabelPlugins: [
    // 按需引入
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es', // default: lib
        style: true,
      },
    ],
  ],
  chainWebpack: function (config) {
    config.module.rule('js').use('thread-loader').loader('thread-loader').before('babel-loader');

    LessLoaderConfig(config);
  },
});
