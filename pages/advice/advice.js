// pages/advice/advice.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    // kolento:'http://127.0.0.1',
    adviceBox:[
      {name:'咒术回战',content:'建议可以多添加一些内容,比如剧场版，tv版本，ova等等，电视剧的内容也可以放进来，这样内容会更加丰富一点。',
      time:'2021年2月25日',avatar:'../../images/icon1.png'},
      {name:'进击的巨人',content:'可以再优化下用户体验。',time:'2021年2月25日',avatar:'../../images/icon2.png'},
      {name:'黄金神威',content:'来看看~',time:'2021年2月15日',avatar:'../../images/icon2.jpg'},
    ],
    commentShow:false,
    text:'',
    userId:'',
    userName:'',
    avatar:'',
    start:0,
    num:20,
    hasData:true,
  },

  getAdvice(){
    let self = this;
    wx.request({
      url: `${self.data.kolento}/advice/list/${self.data.start}/${self.data.num}`, 
      method:'get',
      data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            start:self.data.start+20,
            adviceBox:self.data.adviceBox.concat(res.data.res),
            hasData:res.data.res.length<20?false:true
          });
          console.log('adviceBox',self.data.adviceBox);
        }
      }
    })
  },

  closePop(){
    this.setData({
      commentShow:false
    })
  },

  submitAdvice(){
    var t = new Date();
    let self = this;
    if(self.data.userId){
      wx.request({
        url: `${self.data.kolento}/addAdvice`, 
        method:'post',
        data: {
          time:t.toLocaleString(),
          name:self.data.userName,
          avatar:self.data.avatar,
          content:self.data.text,
          userId:self.data.userId+''
        },
        header: {
          'content-type': 'application/json' 
        },
        success (res) {
          console.log(res.data);
          if(res.data.flag=='success'){
            self.setData({
              commentShow:false,
              text:'',
              start:0
            });
            self.getAdvice();
            Toast('评论成功');
          }
        }
      })
    }else{
      Toast('请先登录~');
    }
  },

  moreContent(){
    this.setData({
      commentShow:true
    })
  },

  changeContent(e){
    this.setData({
      text:e.detail
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
        }
      }
    })
    wx.getStorage({
      key: 'username',
      success (res) {
        if(res.data){
          self.setData({
            userName:res.data
          });
        }
      }
    })
    wx.getStorage({
      key: 'avatar',
      success (res) {
        if(res.data){
          self.setData({
            avatar:res.data
          });
        }
      }
    })

    this.getAdvice();
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
    if(this.data.hasData){
      this.getAdvice();
    }else{
      console.log('数据已经全部加载');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})