/**
 * 小程序配置文件
 */

import { getWeappEnv } from '../utils/utils'

const weappEnv = getWeappEnv()

/** api */
const baseApi = {
  /** 正式版环境 */
  release: 'http://10.10.10.10:80/fupin',

  /** 体验版环境 */
  trial: 'http://10.10.10.10:80/fupin',

  /** 开发版环境 */
  develop: 'http://10.10.10.10:80/fupin',
}

const config = {
  isProd: weappEnv === 'release',
  /** 版本号 */
  version: '1.0.0',
  /** 版本描述(比如，本次版本上线新增了哪些特性、修复了哪些bug) */
  versionDesc: '',
  baseApiUrl: baseApi[weappEnv],
  /** 如果项目有启用tabbar，可以将页面路径更新到tabBarUrlList */
  tabBarUrlList: [],
}

export default config
