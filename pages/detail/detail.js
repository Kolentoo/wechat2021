// pages/detail/detail.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    // kolento:'http://127.0.0.1',
    id:'',
    name:'',
    avatar:'',
    userId:'',
    info:{},
    introduce:{},
    liked:'no',
    likeBox:'',

    // 点评相关
    commentShow:false,
    score:5,
    text:'',

    // 评论
    adviceBox:[],
    start:0,
    num:20
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

  // 获取评论
  getComment(id){
    let self = this;
    wx.request({
      url: `${self.data.kolento}/comment/list/${id}/${self.data.start}/${self.data.num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            adviceBox: res.data.res
          });
          console.log('adviceBox',self.data.adviceBox);
        }
      }
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
            likeBox: res.data.res[0].likeGroup
          });
          if(res.data.res[0].likeGroup){
            if(res.data.res[0].likeGroup.indexOf(self.data.id)>-1){
              self.setData({
                liked:'yes'
              })
            }else{
              self.setData({
                liked:'no'
              })
            }
          }else{
            self.setData({
              liked:'no'
            })
          }
        }
      }
    })
  },

  like(animeId,id){
    let self = this;
    if(self.data.userId){
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
    }else{
      Toast('请先登录~');
    }

  },

  changeScore(e){
    console.log('e',e)
    this.setData({
      score:e.detail
    });
  },

  changeContent(e){
    this.setData({
      text:e.detail
    })
  },

  closePop(){
    this.setData({
      commentShow:false
    });
  },

  comment(){
    console.log('点评');
    this.setData({
      commentShow:true
    });
  },

  submitInfo(){
    var t = new Date();
    let self = this;
    if(self.data.userId){
      wx.request({
        url: `${this.data.kolento}/addComment`, 
        method:'post',
        data: {
          id:self.data.id,
          time:t.toLocaleString(),
          userName:self.data.name,
          avatar:self.data.avatar,
          content:self.data.text,
          userId:self.data.userId+'',
          score:self.data.score*2+'',
        },
        header: {
          'content-type': 'application/json' 
        },
        success (res) {
          console.log(res.data);
          if(res.data.flag=='success'){
            self.setData({
              commentShow:false
            });
            Toast('评论成功');
            self.setData({
              text:'',
              score:5
            });
            self.getComment(self.data.id);
          }
        }
      })
    }else{
      Toast('请先登录~');
    }

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
    wx.getStorage({
      key: 'username',
      success (res) {
        if(res.data){
          self.setData({
            name:res.data
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
    this.setData({
      id:options.id
    });
    this.getDetail(options.id);
    this.getIntroduce(options.id);
    this.getComment(options.id);
    
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