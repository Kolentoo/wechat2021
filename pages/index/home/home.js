// pages/index/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    // 轮播图
    banners: [
      {banner:'../../../images/banner1.jpg'},
      {banner:'../../../images/banner2.jpg'}
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 500,

    // 顶部菜单
    menuBox:[
      {pic:'../../../images/icon1.jpg',name:'番剧榜单'},
      {pic:'../../../images/icon2.jpg',name:'一月新番'},
      {pic:'../../../images/icon3.jpg',name:'正在热映'},
      {pic:'../../../images/icon4.jpg',name:'即将上映'},
    ]
  },

  onSearch(e){
    console.log('e',e);
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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