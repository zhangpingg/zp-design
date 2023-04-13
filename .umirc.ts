import { defineConfig } from 'dumi';
import LessPluginFunctions from 'less-plugin-functions';
import path from 'path';

// const COMMON_URL = 'http://192.168.0.232:8762'; // osp 开发环境
const COMMON_URL = 'http://10.150.10.55:8762'; // osp 开发环境(华为云)
// const COMMON_URL = 'http://192.168.20.245:8762'; // 国寿osp 测试环境
// const COMMON_URL = 'http://192.168.0.151:8762'; // osp  鑫元测试环境

// const XIN_YUAN_API = 'http://192.168.0.116:8005'; // 鑫元开发环境
const XONE_API = 'http://192.168.20.216:8020'; // 开发环境
// const XIN_YUAN_API = 'http://192.168.0.151:8005'; // 鑫元测试环境

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
