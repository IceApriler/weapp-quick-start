const stores = {}

/**
 * 订阅事件
 * @param {String} event 事件名称 或者 '*' 监听全部
 * @param {*} ctx 上下文
 * @param {Function} handler 订阅者，该事件的处理函数（匿名函数无法取消订阅）
 * @param {Boolean} isDelay 是否延时触发
 */
function on(event, ctx, handler, isDelay) {
  if (typeof handler !== 'function') {
    throw new TypeError(
      'The "handler" argument must be of type Function. Received type ' +
        typeof handler,
    )
  }
  stores[event] = stores[event] || []
  let flag = false
  stores[event].forEach((i) => {
    if (i.ctx === ctx && i.handler === handler && i.isDelay === isDelay) {
      flag = true
    }
  })
  if (flag) {
    console.log(`---- ${event} 不可以重复注册 ----`, stores)
    return
  }
  stores[event].push({ ctx, handler, isDelay })
  console.log(`---- ${event} 已注册成功 ----`, stores)
}

/**
 * 对该事件的所有订阅者推送信息
 * 对所有延迟类型的订阅者进行数据暂存
 * @param {String} event 事件名称
 */
function emit(event, data) {
  ;(stores[event] || []).slice().forEach((i) => {
    if (i.isDelay) {
      i.emited = true
      i.data = data
    } else {
      i.handler.call(i.ctx, data)
      console.log(`---- ${event} 事件已触发 ----`, data)
      ;(stores['*'] || []).slice().forEach((j) => {
        j.handler.call(j.ctx, event, data)
      })
    }
  })
}

/**
 * 移除该事件的订阅者
 * @param {String} event 事件名称
 * @param {Function} handler 触发给定事件时响应的处理函数（匿名函数无法取消订阅）
 */
function off(event, handler) {
  if (stores[event]) {
    stores[event] = stores[event].filter((i) => i.handler !== handler)
    console.log(`---- ${event} 事件已移除 ----`)
  }
}

/**
 * 对该事件的所有延迟类型的订阅者推送信息
 * @param {String} event 事件名
 */
function delay(event) {
  if (stores[event]) {
    // 遍历是为了执行所有处理函数
    stores[event].slice().forEach((i) => {
      if (i.isDelay && i.emited) {
        i.handler.call(i.ctx, i.data)
        ;(stores['*'] || []).slice().forEach((j) => {
          j.handler.call(j.ctx, event, i.data)
        })

        console.log(`---- ${event} 事件已触发 ----`)

        i.emited = false
        i.data = null
      }
    })
  }
}

export default {
  stores,
  on,
  emit,
  off,
  delay,
}
