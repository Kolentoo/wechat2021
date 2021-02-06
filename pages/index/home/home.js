// pages/index/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://www.kolento.club',
    keywords:'',
    // 轮播图
    banners: [
      {banner:'../../../images/banner1.jpg'},
      {banner:'../../../images/banner2.jpg'}
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,

    // 顶部菜单
    menuBox:[
      {pic:'../../../images/icon1.jpg',name:'热门榜单'},
      {pic:'../../../images/icon2.jpg',name:'新番导视'},
      {pic:'../../../images/icon3.jpg',name:'正在热映'},
      {pic:'../../../images/icon4.jpg',name:'即将上映'},
    ],
    
    // 热门推荐
    hotBox:[],
    // 番剧榜单
    rankingBox:[],
    // 正在热映
    playingBox:[],
    // 即将上映
    commingBox:[],
  },

  onSearch(e){
    console.log('e',e);
  },

  // 获取热门推荐
  getHot(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/all/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            hotBox: res.data.result
          });
        }
      }
    })
  },

  // 获取番剧榜单
  getRanking(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/ranking/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            rankingBox: res.data.result
          });
        }
      }
    })
  },

  // 获取正在上映电影
  getPlaying(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/movie/playing/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            playingBox: res.data.result
          });
        }
      }
    })
  },

  // 获取即将上映
  getComming(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/movie/comming/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            commingBox: res.data.result
          });
        }
      }
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
    this.getHot(0,6);
    this.getRanking(0,6);
    this.getPlaying(0,6);
    this.getComming(0,6);
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