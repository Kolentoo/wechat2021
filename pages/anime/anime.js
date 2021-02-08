// pages/anime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    active: 0,
    swipeable:true,
    recommendBox:[],
    rankingBox:[],
    start1:0,
    num1:20,
    start2:0,
    num2:20,
  },

  onChange(event) {
    console.log('event.detail.name',event.detail.name)
  },

  // 获取全部热门动画
  getAll(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/all/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.res);
        if(res.data.flag=='success'){
          self.setData({
            recommendBox: res.data.res
          });
        }
      }
    })
  },

  // 获取评分最高动漫
  getRanking(start,num){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/ranking/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.res);
        if(res.data.flag=='success'){
          self.setData({
            rankingBox: res.data.res
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
    this.getAll(this.data.start1,this.data.num1);
    this.getRanking(this.data.start2,this.data.num2);
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