const app = getApp();
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
    likeBox:[],
    listBox:[],
  },

  onChange(event) {
    console.log('event.detail.name',event.detail.name)
  },


  // 进入动漫详情页
  goDetail(item){
    console.log('item',item.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?id='+item.currentTarget.dataset.id
    })
  },

  // 获取用户收藏的动漫列表
  getLike(id){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/likeBox/${id}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            likeBox: res.data.res[0].likeGroup?res.data.res[0].likeGroup.split(','):''
          });
          console.log('likeBox',self.data.likeBox);

          self.getList(res.data.res[0].likeGroup);
        }
      }
    })
  },

  // 根据id获取收藏列表详情
  getList(idBox){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/amineBox/${idBox}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            listBox: res.data.res
          });
          console.log('listBox',self.data.listBox);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.getStorage({
      key: 'id',
      success (res) {
        console.log('获取用户id',res.data);
        if(res.data){
          self.setData({
            userId:res.data
          });
          self.getLike(res.data);
        }
      }
    })
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
    this.getTabBar().init();
    if(this.data.userId){
      this.getLike(this.data.userId);
    }
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
    if(this.data.userId){
      this.getLike(this.data.userId);
    }
    
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