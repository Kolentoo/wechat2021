Page({

  /**
   * 页面的初始数据
   */
  data: {
    kolento:'https://kolento.club',
    keywords:'',
    // 轮播图
    banners: [
      {banner:'../../images/banner1.jpg'},
      {banner:'../../images/banner1.jpg'}
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,

    // 顶部菜单
    menuBox:[
      {pic:'../../images/icon1.jpg',name:'近期新番',url:'../new/new'},
      {pic:'../../images/icon2.jpg',name:'新番榜单',url:'../anime/anime'},
      {pic:'../../images/icon3.jpg',name:'正在热映',url:'../film/film'},
      {pic:'../../images/icon4.jpg',name:'即将上映',url:'../film/film'},
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
    wx.navigateTo({
      url: '../search/search?name='+e.detail
    })
  },

  // 获取热门推荐
  getHot(start,num,year,month){
    let self = this;
    wx.request({
      url: `${this.data.kolento}/anime/exact/${year}/${month}/${start}/${num}`, 
      // data: {},
      header: {
        'content-type': 'application/json' 
      },
      success (res) {
        console.log(res.data);
        if(res.data.flag=='success'){
          self.setData({
            hotBox: res.data.res
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
            rankingBox: res.data.res
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
            playingBox: res.data.res
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
            commingBox: res.data.res
          });
        }
      }
    })
  },

  // 首页菜单栏跳转
  goMenu(event){
    console.log('event',event);
    if(event.currentTarget.dataset.item.name=='正在热映'||event.currentTarget.dataset.item.name=='即将上映'||event.currentTarget.dataset.item.name=='番剧榜单'){
      wx.navigateTo({
        url: event.currentTarget.dataset.item.url
      });
    }else{
      wx.switchTab({
        url: event.currentTarget.dataset.item.url
      });
    }

  },

  // 进入动漫详情页
  goDetail(item){
    console.log('item',item.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?id='+item.currentTarget.dataset.id
    })
  },

  // 进入电影详情页
  goMdetail(item){
    console.log('item',item.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../mdetail/mdetail?id='+item.currentTarget.dataset.id+'&type='+item.currentTarget.dataset.type
    })
  },

  // 发现更多近期动漫
  moreAnime(){
    wx.switchTab({
      url: '../new/new'
    });
  },

  // 发现更多动漫榜单
  moreRanking(){
    wx.navigateTo({
      url: '../anime/anime'
    });
  },

  // 发现更多电影
  moreFilm(){
    wx.navigateTo({
      url: '../film/film'
    });
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
    this.getHot(0,6,2021,1);
    this.getRanking(0,6);
    this.getPlaying(0,6);
    this.getComming(0,6);
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