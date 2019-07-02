/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import Cookies from 'js-cookie';
import { Message } from 'iview';
import store from '../../store'//Vuex

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '';

} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = window.OauthConfig.back_end;
}
export let programHeader = Header;

// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  // config => {
  //   let token = Cookies.get('access_token');
  //   let code = Cookies.get('token_code');

  //   if (!token && !code) {
  //     location.href = Header.login_url;
  //   }
  //   config.headers.Authorization = 'bearer' + ' ' + token;
  //   return config;
  // },
  // error => {
  //   return Promise.error(error);
  // }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  // 服务器状态码不是200的情况
  error => {
    console.error(error);
    console.log(error.response);
    if (error.response.data) {
      if (error.response.data.error == "invalid_grant" || error.response.data.error == "invalid_token") {
        //当code重复时 err:invalid_grant
        alert('err')
        location.href = Header.login_url;
      }
      if (error.response.data.error == 'access_denied' || error.response.data.error == 'unauthorized') {
        Message.error({
          content: '对不起,暂无相关权限！请重新登录或联系管理员重试',
          duration: 5
        });
        return Promise.reject(error.response);
      }
    }
    // if (error.response.status) {}
  }
);
//状态码
const SUCCESS_CODE = 200;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        if (res.data.code != SUCCESS_CODE) {
          Message.warning({
            content: `服务器错误,状态码${res.data.code}`,
            duration: 5
          });
          return
        }
        resolve(res.data);
      })
      .catch(err => {
        Message.error({
          content: `连接服务器失败,请刷新后重试!`,
          duration: 5
        });
        reject(err);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]。
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*'
        }
      })
      .then(res => {
        //  console.log(res.data.code);
        if (res.data.code != SUCCESS_CODE) {
          Message.warning({
            content: `服务器错误,状态码${res.data.code}`,
            duration: 5
          });
          return
        }
        resolve(res.data);
      })
      .catch(err => {
        Message.error({
          content: `连接服务器失败,请刷新后重试!`,
          duration: 5
        });
        reject(err);
      });
  });
}
export function postToken(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params), {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function postFormData(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
