// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 菜单栏选项
    year:[
      { text: '2021年', value: 2021 },
      { text: '2020年', value: 2020 },
      { text: '2019年', value: 2019 },
      { text: '2018年', value: 2018 },
      { text: '2017年', value: 2017 },
      { text: '2016年', value: 2016 },
      { text: '2015年', value: 2015 },
    ],
    month:[
      { text: '1月', value: 1 },
      { text: '4月', value: 4 },
      { text: '7月', value: 7 },
      { text: '10月', value: 10 },
    ],
    yearValue:2021,
    monthValue:1,
    kolento:'https://kolento.club',
    recommendBox:[],
    start1:0,
    num1:20,
  },

  // 按照年份和月份获取动漫
  getAll(year,month){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/exact/${year}/${month}`, 
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

  changeYear(e){
    console.log(e.detail);
    this.setData({
      yearValue:e.detail
    })
    this.getAll(e.detail,this.data.monthValue);
  },

  changeMonth(e){
    console.log(e.detail);
    this.setData({
      monthValue:e.detail
    })
    this.getAll(this.data.yearValue,e.detail);
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAll(this.data.yearValue,this.data.monthValue);
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