// components/bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    list: [
      {
        "url": "/pages/home/home",
        "icon": "home-o",
        "text": "首页"
      },
      {
        "url": "/pages/new/new",
        "icon": "flower-o",
        "text": "番剧"
      },
      {
        "url": "/pages/discover/discover",
        "icon": "shop-collect-o",
        "text": "收藏"
      },
      {
        "url": "/pages/my/my",
        "icon": "smile-o",
        "text": "我的"
      }
    ]
  },



  /**
   * 组件的方法列表
   */
  methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},
    init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
  }
})
