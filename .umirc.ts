import { defineConfig } from 'dumi';
import LessPluginFunctions from 'less-plugin-functions';
import path from 'path';

export default defineConfig({
  title: 'zp-component-library',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  alias: {
    '@': 'src',
  },
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
        modifyVars: { '@ant-prefix': 'ant', '@font-size-base': '12px' },
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
        path.resolve(__dirname, './src/styles/dumi-common.less'),
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
});
