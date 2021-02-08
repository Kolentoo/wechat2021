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
    active:0
  },



  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      console.log('event',event)
      this.setData({ active: event.detail });
      if(event.detail==0){
        wx.navigateTo({
          url: '/pages/home/home'
        });
      }else if(event.detail==1){
        wx.navigateTo({
          url: '/pages/anime/anime'
        });
      }else if(event.detail==2){

      }else{
        wx.navigateTo({
          url: '/pages/my/my'
        });
      }
    },
  }
})
