const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    searchBox:[],
    start1:0,
    num1:20,
    searchLength:0,
  },

  onChange(event) {
    console.log('event.detail.name',event.detail.name)
  },

  // 获取评分最高动漫
  getSearch(name){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/animeName/${name}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.res);
        if(res.data.flag=='success'){
          self.setData({
            searchBox: res.data.res,
            searchLength:res.data.res.length
          });
        }
      }
    })
  },

  // 进入动漫详情页
  goDetail(item){
    console.log('item',item.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?id='+item.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.name){
      this.getSearch(options.name);
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})