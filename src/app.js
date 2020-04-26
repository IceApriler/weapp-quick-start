// app.js
import { wxp } from './utils/utils'

App({
  /**
   * 扩展微信小程序api支持promise
   *
   * __eg__: getApp().wxp.getSetting.then()
   */
  wxp,
  onLaunch() {},
  globalData: {},
})
