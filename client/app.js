//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  //全局变量
  globalData: {
    userInfo: null,
    hasLogin:false,
    sysInfo: null,
    windowW: null,
    windowH: null
  },
  //启动
  onLaunch: function () {
    // 获取用户信息
    this.getUserInfo();
    this.getSys();
  },

  //获取用户信息
  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            that.globalData.hasLogin = true
            console.log(res.userInfo);
            //console.log(res.iv);
            //console.log(res.encryptedData);
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  },
  //获取手机信息
  getSys: function () {
    var that = this;
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        //设置变量值
        that.globalData.sysInfo = res;
        that.globalData.windowW = res.windowWidth;
        that.globalData.windowH = res.windowHeight;
      }
    })
  }
})