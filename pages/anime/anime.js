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
    pending1:true,
    pending2:true,
    finished1:false,
    finished2:false,
  },

  onChange(event) {
    console.log('event.detail.name',event.detail.name)
  },

  // 获取全部热门动画
  getAll(start,num){
    let self = this;
    self.setData({
      pending1:true,
    });
    wx.request({
      url: `${this.data.kolento}/anime/popular/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.res);
        if(res.data.flag=='success'){
          if(res.data.res.length<20){
            self.setData({
              finished1:true
            });
          }
          self.setData({
            recommendBox: self.data.recommendBox.concat(res.data.res),
            pending1:false,
          });
        }
      }
    })
  },

  // 获取评分最高动漫
  getRanking(start,num){
    let self = this;
    self.setData({
      pending2:true,
    });
    wx.request({
      url: `${this.data.kolento}/anime/ranking/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data.res);
        if(res.data.flag=='success'){
          if(res.data.res.length<20){
            self.setData({
              finished2:true
            });
          }
          self.setData({
            rankingBox: self.data.rankingBox.concat(res.data.res),
            pending2:false,
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
    // this.getTabBar().init();
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
    if(this.data.active==0){
      if(!this.data.finished1){
        if(!this.data.pending1){
          this.setData({
            start1:this.data.start1+20
          });
          this.getAll(this.data.start1,this.data.num1);
        }else{
          console.log('数据还没加载完');
        }
      }
    }else{
      if(!this.data.finished2){
        if(!this.data.pending2){
          this.setData({
            start1:this.data.start2+20
          });
          this.getRanking(this.data.start2,this.data.num2);
        }else{
          console.log('数据还没加载完');
        }
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})