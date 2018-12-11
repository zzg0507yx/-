var app = getApp()
Page({
  var :app = getApp(),
  /**
   * 页面的初始数据
   */

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
  //以下为作用代码
  data: {
    title:"<<<<烫手积分表>>>>",
    number1: 0,
    number2: 0,
    number3: 0,
    number4: 0,
    tempFilePaths: '',
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  jiashu1: function(){
    var that=this;
    var number=that.data.number1;
    number++;
    this.setData({
      number1:number
    })
  },
  jianshu1: function () {
    var that = this;
    var number = that.data.number1;
    number--;
    this.setData({
      number1: number
    })
  },
  chongzhi1(){
    this.setData({
      number1:0
    })
  },
  jiashu2: function () {
    var that = this;
    var number = that.data.number2;
    number++;
    this.setData({
      number2: number
    })
  },
  jianshu2: function () {
    var that = this;
    var number = that.data.number2;
    number--;
    this.setData({
      number2: number
    })
  },
  chongzhi2() {
    this.setData({
      number2: 0
    })
  },
  jiashu3: function () {
    var that = this;
    var number = that.data.number3;
    number++;
    this.setData({
      number3: number
    })
  },
  jianshu3: function () {
    var that = this;
    var number = that.data.number3;
    number--;
    this.setData({
      number3: number
    })
  },
  chongzhi3() {
    this.setData({
      number3: 0
    })
  },
  jiashu4: function () {
    var that = this;
    var number = that.data.number4;
    number++;
    this.setData({
      number4: number
    })
  },
  jianshu4: function () {
    var that = this;
    var number = that.data.number4;
    number--;
    this.setData({
      number4: number
    })
  },
  chongzhi4() {
    this.setData({
      number4: 0
    })
  }
})