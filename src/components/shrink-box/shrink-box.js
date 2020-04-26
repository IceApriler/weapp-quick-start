Component({
  externalClasses: ['qy-outer-class', 'qy-inner-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    isShow: {
      value: true,
      type: Boolean,
      observer: 'qyShowChange',
    },
    // 动画持续时间，单位 ms
    duration: {
      value: 300,
      type: Number,
    },
    // 动画的效果
    timingFunction: {
      value: 'ease-in-out',
      type: String,
    },
    // 动画延迟时间，单位 ms
    delay: {
      value: 0,
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    qyShowChange(newVal) {
      if (newVal) {
        // 显示
        this.getRect().then((res) => {
          res && this.show(res)
        })
      } else {
        this.getRect().then((res) => {
          res && this.hidden(res)
        })
      }
    },
    getRect() {
      return new Promise((resolve) => {
        const query = wx.createSelectorQuery().in(this) // 将选择器的选取范围更改为自定义组件 component 内
        query
          .select('#inner')
          .boundingClientRect(function (res) {
            resolve(res)
          })
          .exec()
      })
    },
    show({ height }) {
      this.animation.height(height).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
    hidden() {
      this.animation.height(0).step()
      this.setData({
        animationData: this.animation.export(),
      })
    },
  },
  ready() {
    const { duration, timingFunction, delay } = this.data
    this.animation = wx.createAnimation({
      duration,
      timingFunction,
      delay,
    })

    // 初始化
    this.qyShowChange(this.data.isShow)
  },
})
