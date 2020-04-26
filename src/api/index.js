import request from './request'

/** 登录 */
export const login = (params, reqConfig) => {
  return request('post', `/login`, params, reqConfig)
}

/** 获取用户信息 */
export const getUserInfo = (params, reqConfig) => {
  return request('get', `/userinfo`, params, reqConfig)
}
