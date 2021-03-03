// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // kolento:'https://kolento.club',
    kolento:'http://127.0.0.1',
    id:'',
    userId:'',
    info:{},
    introduce:{},
    liked:'no',

    // 点评相关
    commentShow:false,
    score:10,
    text:'',
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

  like(animeId,id){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/addAnime/${self.data.id}/${self.data.userId}/${self.data.liked}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          if(self.data.liked=='yes'){
            self.setData({
              liked:'no'
            });
            Toast('取消成功');
          }else{
            self.setData({
              liked:'yes'
            });
            Toast('收藏成功');
          }

          
        }
      }
    })
  },

  closePop(){
    this.setData({
      commentShow:false
    });
  },

  comment(){
    console.log('点评');
    Toast('开发中~~');
    this.setData({
      commentShow:true
    });
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
        }
      }
    })
    this.setData({
      id:options.id
    });
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