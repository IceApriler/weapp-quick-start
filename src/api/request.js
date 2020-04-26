import config from '../config'

/** request请求封装 */
function request(method, url, params = {}, reqConfig) {
  const {
    showLoading = true,
    showToast = true,
    contentType = 'application/json',
    loadingTitle = '',
  } = reqConfig || {}
  const token = wx.getStorageSync('token') || ''
  const env = wx.getStorageSync('env')
  if (config.env !== env) {
    wx.removeStorageSync('token')
    wx.setStorageSync('env', config.env)
  }
  return new Promise((resolve, reject) => {
    showLoading &&
      wx.showLoading({
        title: loadingTitle || '加载中',
      })
    wx.request({
      url: config.rootUrl + url,
      data: params,
      header: {
        'content-type': contentType,
        Authorization: `Bearer ${token}`,
      },
      method: method.toUpperCase(),
      success: (res) => {
        showLoading && wx.hideLoading()
        const { data } = res
        if (data.status === 200) {
          resolve(data)
        } else if (data.status === 401) {
          // 跳转到登录界面 / 登录
        } else {
          showToast &&
            wx.showToast({
              icon: 'none',
              title: data.message,
            })
          reject(data)
        }
      },
      fail: (err) => {
        console.log('request fail:', err)
        showLoading && wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: err.errMsg,
        })
        reject(err)
      },
    })
  })
}
