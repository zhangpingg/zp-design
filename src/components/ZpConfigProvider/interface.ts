import { ConfigProviderProps } from 'antd/es/config-provider';

export interface ZpConfigProviderProp {
  /**
   * @description zp-component-library 样式前缀
   * @default zp
   */
  prefix?: string;

  /**
   * @description 对应 antd 样式前缀
   * @default zp-ant
   */
  antPrefix?: string;

  /**
   * @description antd 的版本  3|4
   * @default '4'
   */
  antVersion?: '3' | '4';

  /**
   * @description antd3 版本时需要传递给组件的对应组件，这些组件在 antd3 模式下有异常
   */
  components?: {
    message: any;
  };

  /**
   * @description antd 的 configProvider 属性，需要调整 antd 对应属性时进行配置，比如 componentSize locale 等
   * @defautl {}
   */
  antdConfigProvider: ConfigProviderProps;
}
