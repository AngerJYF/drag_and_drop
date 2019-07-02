/**
 * api接口统一管理
 * by fengyang
 */
import {
  post, get
} from './http';

export const rootPath = '';

export const apiDataUpload = (formData, url) => postFormData(rootPath + url, formData);
// 获取token
export const apiPostToken = params => postToken(rootPath + '/oauth/token', params);
// 首页权限菜单获取
export const apiHomelist = () => get(rootPath + '/user/me');
//获取动态菜单列表
export const apiGetListItem = (id, userId) => get(rootPath + `/permission/menu/${id}/${userId}`);