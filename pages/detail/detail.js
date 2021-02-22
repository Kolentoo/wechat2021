// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    id:'',
    info:{},
    introduce:{}
  },

  // 获取详情
  getDetail(id){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/animeId/${id}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            info: res.data.res[0]
          });
          console.log('info',self.data.info);
        }
      }
    })
  },

  // 获取介绍
  getIntroduce(id){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/detail/${id}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            introduce: res.data.res[0]
          });
          console.log('introduce',self.data.introduce);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
    this.getIntroduce(options.id);
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