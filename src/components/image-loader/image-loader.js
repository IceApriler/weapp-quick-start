Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 图片资源地址，支持云文件ID（2.2.3起）
    src: {
      value: '',
      type: String,
    },
    // scaleToFill|aspectFit|aspectFill|widthFix
    mode: {
      value: 'scaleToFill',
      type: String,
    },
    // 图片懒加载。只针对page与scroll-view下的image有效
    lazyLoad: {
      value: false,
      type: Boolean,
    },
    // 在图片未加载完毕前的默认图片资源
    defaultImageSrc: {
      value: '',
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showImage: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 图片加载错误
     * @param {Object} e.detail = { errMsg: 'something wrong' }
     */
    onError(e) {
      this.triggerEvent('binderror', { detail: e.detail })
    },
    /**
     * 图片加载完毕
     * @param {Object} e.detail = { height:'图片高度px', width:'图片宽度px' }
     */
    onLoad(e) {
      this.setData({
        showImage: true,
      })
      this.triggerEvent('bindload', { detail: e.detail })
    },
  },
})
