// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper
    activities: ['../../image/activities/activity-1.jpg', '../../image/activities/activity-2.jpg', '../../image/activities/activity-3.jpg', '../../image/activities/activity-4.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    // 新闻数据
    topics: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTopics();
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

  },

  // swiper
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  // 新闻
  onReachBottom: function () {
    this.setData({
      "page": this.data.page + 1
    });
    this.loadTopics();
  },
  showDetail: function (event) {
    wx.navigateTo({
      url: './newsDetails/newsDetails?id=' + event.target.dataset.id
    })
  },
  loadTopics: function () {
    var that = this;
    var old = this.data.topics;
    // 页面初始化 options为页面跳转所带来的参数
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: 'https://nutz.cn/yvr/api/v1/topics',
      data: {
        page: that.data.page
      },
      success: function (res) {
        wx.hideToast();
        that.setData({
          'topics': old.concat(res.data.data)
        });
      }
    })
  }

})