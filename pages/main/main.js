//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    time: 90,         //初始时间
    intervals: "" ,     //定时器
    imgUrls: [
      'http://pic.5tu.cn/uploads/allimg/1409/201111098960.jpg',
      'https://p1.ssl.qhmsg.com/t01e240e6994b9b0679.png',
      'http://p1.s.hjfile.cn/thread/201110/20111004123456656_647_o.jpg',
      'https://pbs.twimg.com/media/CbznBKKWEAA0jKZ.jpg:large'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000,//  滑动动画时长1s
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jumpToMapPage: function () {
    wx.navigateTo({ 
      url: '/pages/map/map' })
  },
  /**
   * 开始倒计时
  */
  startTap: function () {
    var that = this;
    var time = that.data.time;
    that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
    console.log("倒计时开始")
    var intervals = setInterval(function () {
      time--;
      that.setData({
        time: time
      })
      if (time == 0) {           //归0时回到60
        that.stopTap();
      }
    }, 1000)

    that.setData({
      intervals: intervals
    })
  },

  /**
    * 暂停倒计时
   */
  stopTap: function () {
    var that = this;
    console.log("倒计时暂停")
    that.clearTimeInterval(that)
  },

  /**
    * 重新倒计时
   */
  restartTap: function () {
    var that = this;
    that.stopTap();
    this.setData({
      time: '90'
    })
  },

  /**
    * 初始化数据
   */
  init: function (that) {
    var time = that.data.time;
    var intervals = ""
    that.clearTimeInterval(that)
    that.setData({
      time: time,
      intervals: intervals,
    })
  },

  /**
    * 清除interval
   * @param that
   */
  clearTimeInterval: function (that) {
    var intervals = that.data.intervals;
    clearInterval(intervals)
  },
  getDataFromOneNet: function () {
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/504826057/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': 'pnARE3sG4OwVhLT=lYmVYwKrfs8='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.light)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '/pages/chart/chart',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },
  /**
    * 生命周期函数--监听页面卸载
    * 退出本页面时停止计时器
   */
  onUnload: function () {
    var that = this;
    that.clearTimeInterval(that)
  },

  /**
    * 生命周期函数--监听页面隐藏
    * 在后台运行时停止计时器
   */
  onHide: function () {
    var that = this;
    that.clearTimeInterval(that)
  }

})