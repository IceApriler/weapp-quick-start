import config from '../config/index'
import { promisifyAll } from 'miniprogram-api-promise'
const { tabBarUrlList } = config
const systemInfo = wx.getSystemInfoSync()

/**
 * 判断变量类型
 */
export const types = {
  _typeof(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase()
  },
  isString(o) {
    return this._typeof(o) === 'string'
  },
  isNumber(o) {
    return this._typeof(o) === 'number'
  },
  isArray(o) {
    return this._typeof(o) === 'array'
  },
  isObject(o) {
    return this._typeof(o) === 'object'
  },
}

/**
 * 是否以某个片段字符串开头
 * @param {String} string 完整字符串
 * @param {String} str 片段字符串
 */
export function isStartWith(string, str) {
  return string.slice(0, str.length) === str
}

/**
 * 格式化小程序url
 * @param {String} url
 */
export function formatPagesUrl(url) {
  return isStartWith(url, '/pages')
    ? url
    : isStartWith(url, 'pages')
    ? `/${url}`
    : ''
}

/**
 * 页面跳转，合并处理switchTab和navigateTo
 * @param {String} url 页面路径
 * @param {object} params 对象参数，会被转换成queryString进行传参(数据中不要包含“=”、“&”之类的，会影响目标页面接受参数。不过也可以先使用encodeURIComponent进行编码)
 */
export function navigateTo(url, params) {
  let paramsStr = ''
  url = formatPagesUrl(url)
  if (params && tabBarUrlList.indexOf(url) === -1) {
    paramsStr = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
    url += `?${paramsStr}`
  }
  switch (true) {
    case tabBarUrlList.indexOf(url) > -1:
      wx.switchTab({ url })
      break

    default:
      wx.navigateTo({ url })
  }
}

/**
 * 返回上一页，若当前页为第一页，则跳首页
 */
export function navigateBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    // 否则返回上一页
    wx.navigateBack({ delta: 1 })
  } else {
    navigateTo('pages/tabbar/index/index')
  }
}

/**
 * 检测字符串中是否含有emoji
 * @param {String} str 字符串
 */
export function emojiTest(str) {
  if (typeof str === 'string') {
    const emoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g // 4字节utf-16 = emoji
    return emoji.test(str)
  } else {
    return false
  }
}

/**
 * rpx转px
 * @param {Number} rpx
 */
export function rpx2px(rpx) {
  return (systemInfo.windowWidth / 750) * rpx
}

/**
 * 防抖
 * @param {Function} callback 回调函数
 * @param {Object}} ctx 上下文
 * @param {Number} delay 防抖的时间
 */
export function debounce(callback, ctx, delay = 600) {
  let timeoutID
  return function (...arg) {
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(callback.bind(ctx, ...arg), delay)
  }
}

/**
 * 获取小程序的环境
 * @returns {String} env "release" | "trial" | "develop"
 */
export function getWeappEnv() {
  return typeof __wxConfig !== 'undefined'
    ? __wxConfig.envVersion || 'release'
    : 'release'
}

/**
 * 扩展微信小程序api支持promise
 */
export const wxp = {}
promisifyAll(wx, wxp)
