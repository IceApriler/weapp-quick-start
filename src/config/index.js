/**
 * 小程序配置文件
 */

/** 正式上线前，需要将isProd设置为true */
const isProd = false

/** 开发环境url */
const devApiUrl = 'http://111.62.218.53:80/fupin'

const config = {
  isProd,
  /** 版本号 */
  version: '1.0.0',
  /** 版本描述(比如，本次版本上线新增了哪些特性、修复了哪些bug) */
  versionDesc: '',
  baseApiUrl: isProd ? '' : devApiUrl,
  /** 如果项目有启用tabbar，可以将页面路径更新到tabBarUrlList */
  tabBarUrlList: [],
}

export default config
