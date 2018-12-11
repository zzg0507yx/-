// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  data: {
    phone: '',
    password: ''
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //登录
  login: function (e) {
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: "不能为空!",
        icon: 'loading',
        duration: 2000
      })
    } else {
      //显示弹窗
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000
      }),
        //跳转延迟
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/welcome/welcome',
          })
        }, 1000)
    }
  },
  zhuCe: function(){
    wx.navigateTo({
      url: '/pages/zhuce/zhuce',
    })
  }
})