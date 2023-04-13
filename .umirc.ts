import { defineConfig } from 'dumi';
import LessPluginFunctions from 'less-plugin-functions';
import path from 'path';
import WebpackChain from 'webpack-chain';

const COMMON_URL = 'http://ip:8762'; // osp开发环境

const XONE_API = 'http://ip:8020'; // xone开发环境

export default defineConfig({
  title: 'zp-design',
  favicon: '/favicon.png',
  logo: '/favicon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  alias: {
    '@': 'src',
  },
  webpack5: {},
  fastRefresh: {},
  hash: true,
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
  // mfsu: {},
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
    const rule = config.module.rule('less');
    const cssModule = rule.oneOf('css-modules');
    const css = rule.oneOf('css');
    // 删除less-loader
    cssModule.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));
    css.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));
    // 重新添加 less-loader
    const options = {
      lessOptions: {
        modifyVars: { '@ant-prefix': 'zp-ant', '@font-size-base': '12px' },
        javascriptEnabled: true,
        plugins: [new LessPluginFunctions({ alwaysOverride: true })],
      },
    };
    cssModule
      .use('less-loader')
      .loader('less-loader')
      .options({ ...options });
    css
      .use('less-loader')
      .loader('less-loader')
      .options({ ...options });

    // 添加 style-resources-loader 将文件注入到每个less文件的后面
    const resourceOptions = {
      patterns: [
        path.resolve(__dirname, './src/styles/less-functions-overrides.less'),
        path.resolve(__dirname, './src/styles/antd-vars-patch.less'),
      ],
      injector: 'append',
    };

    cssModule
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({ ...resourceOptions });
    css
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({ ...resourceOptions });
  },
  devtool: false,
  // node_modules 下的文件 不走babel编译
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
