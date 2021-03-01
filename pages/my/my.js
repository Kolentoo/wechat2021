const app = getApp();
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // kolento:'https://kolento.club',
    kolento:'http://127.0.0.1',
    // 头部个人信息
    avatar:'',
    mail:'../../images/mail.jpeg',
    femail:'../../images/femail.jpeg',
    name:'Kolento',
    country:'',
    sex:'1',
    id:'123',
    login:'编辑', 
    status:'未登录',
    // 社交信息
    menuBox:[
      {txt:'关注',src:'../../images/guanzhu.png'},
      {txt:'粉丝',src:'../../images/fensi.png'},
      {txt:'动态',src:'../../images/dongtai.png'},
      {txt:'微博',src:'../../images/weibo.png'},
    ],
    // 分享
    showShare: false,
    options: [
      [
        { name: '微信', icon: 'wechat' ,openType: 'share'},
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ]
    ],
    show:false,

  },

  bindGetUserInfo (e) {
    console.log('授权',e.detail.userInfo);
    if(e.detail.userInfo!=undefined){
      let self = this;
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo);
                self.setData({
                  name:res.userInfo.nickName,
                  sex:res.userInfo.gender,
                  avatar:res.userInfo.avatarUrl,
                  country:res.userInfo.country,
                  status:'已登录'
                },function(){
                  console.log('self.data.status',self.data.status)
                  wx.request({
                    url: `${self.data.kolento}/addUser`, 
                    method:'post',
                    data: {
                      name:res.userInfo.nickName,
                      sex:res.userInfo.gender,
                      country:res.userInfo.country,
                      avatar:'hahaha'
                      // avatar:res.userInfo.avatarUrl
                      // name:'K o l e n t o',
                      // sex:2,
                      // country:3,
                      // avatar:4
                    },
                    header: {
                      'content-type': 'application/json' 
                    },
                    success (res) {
                      console.log(res.data);
                      if(res.data.flag=='success'){
                        Toast('欢迎~');
                      }
                    }
                  })
                });
              }
            })
          }
        }
      })
    }
  },

  login(){

  },

  edit(){
    this.setData({
      show:true
    });
  },

  closeEdit(){
    this.setData({
      show:false
    });
  },

  changeName(){
    console.log('修改名字');
  },

  weibo(){
    wx.navigateToMiniProgram({
      appId: 'wx9074de28009e1111',
      path: 'pages/profile/profile?nickname=XKolento&objectUid=1921492471',
      // extraData: {
      //   foo: 'bar'
      // },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  share(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    if(event.detail.name=='微博'||event.detail.name=='QQ'){
      Toast('暂不支持分享到'+event.detail.name);
    }
    this.onClose();
  },

  goMessage(){
    wx.navigateTo({
      url: '../message/message'
    });
  },

  goAdvice(){
    wx.navigateTo({
      url: '../advice/advice'
    });
  },

  goAbout(){
    wx.navigateTo({
      url: '../about/about'
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo);
              self.setData({
                name:res.userInfo.nickName,
                sex:res.userInfo.gender,
                avatar:res.userInfo.avatarUrl,
                country:res.userInfo.country,
                status:'已登录'
              });



              
            }
          })
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