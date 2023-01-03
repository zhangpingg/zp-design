import { message, Modal } from 'antd';
import getFetch from '../utils/fetch';

// 测试时直接写死token
const fetch = getFetch(
  () => {
    location.reload();
  },
  {
    message,
    Modal,
  },
);

/** 登录 */
export const login = (params: object) => {
  return fetch.post<any, any, any>('/common-api/system/user/login/v2', params);
};
/** 调用登录 */
login({
  // loginName: 'admin',
  loginName: 'zhuochengyin',
  password: 'LdpdgSxk/yl3Np3RynWs7Q==',
}).then((res) => {
  localStorage.setItem('user_token', res?.data?.tokenVal?.token);
});

/** 搜索框的下拉接口 */
export const searchSelectApi = (params: object) => {
  return fetch
    .post('/xone-api/foundation/v2.0/product/listSelect', params)
    .then((res) => Promise.resolve(res || []));
};
