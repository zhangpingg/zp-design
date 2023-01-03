import axios, { AxiosRequestConfig } from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const ContentType = {
  JSON: 'application/json; charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
};
let notAuthOnce = false;

const fetch = axios.create({ timeout: 5000000 });

const getFetch = (
  noAuthorityCb: () => any, // 没有权限的回调函数
  components: {
    message: any;
    Modal: any;
  },
  selfConfig?: AxiosRequestConfig<any>,
  oldFetch?: boolean,
  replaceConfig?: (config: AxiosRequestConfig) => AxiosRequestConfig | void,
) => {
  const message = components.message;
  const Modal = components.Modal;

  fetch.interceptors.request.use(
    (config) => {
      return {
        cancelToken: source.token,
        ...config,
        ...selfConfig,
        headers: {
          ...config.headers,
          Accept: ContentType.JSON,
          'Content-Type': ContentType.JSON,
          Token: localStorage.getItem('user_token')!,
          ...selfConfig?.headers,
        },
        ...replaceConfig?.(config),
      };
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  fetch.interceptors.response.use(
    (response) => {
      // 2xx的请求
      const { status, config } = response;
      // 正常
      if (status === 200) {
        if (oldFetch) {
          return Promise.resolve(response);
        }
        // 文件导出  responseType ==='blob';
        if (config.responseType === 'blob') {
          return response;
        }
        // 普通接口
        const data = response.data;
        // const { code, msg, data: data1 } = data;
        // 服务内部的报错
        // if (code !== '0') {
        //   message.error(msg || '');
        //   return Promise.reject(data);
        // }
        return Promise.resolve(data);
      }
      // 异常
      return Promise.reject(response);
    },
    (errorResponse) => {
      const { response } = errorResponse || {};
      const { status, statusText, data } = response || {};
      const showText = data?.msg || statusText;
      if (status === 401) {
        if (notAuthOnce) {
          return Promise.reject();
        }
        notAuthOnce = true;
        Modal.confirm({
          title: '提示',
          content: '会话失效，请重新登录！',
          onOk: () => {
            notAuthOnce = false;
            noAuthorityCb && noAuthorityCb();
          },
        });
        return Promise.reject();
      }
      if (status === 500) {
        message.error(showText);
      }
      // 2xx以外的请求
      return Promise.reject(errorResponse);
    },
  );
  return fetch;
};

// 获取新的anxios实例
const getNewFetch = () => axios.create({ timeout: 5000000 });

export { CancelToken, source, getNewFetch };
export default getFetch;
