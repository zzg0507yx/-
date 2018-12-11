var myCharts = require("../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_hum = null
var lineChart_light = null
var lineChart_tempe = null
var app = getApp()

Page({
  data: {
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },


  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var humidity = [];
    var light = [];
    var tempe = [];

    var length = app.globalData.light.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.globalData.humidity.datapoints[i].at.slice(11, 19));
      humidity.push(app.globalData.humidity.datapoints[i].value);
      light.push(app.globalData.light.datapoints[i].value);
      tempe.push(app.globalData.temperature.datapoints[i].value);
    }
    return {
      categories: categories,
      humidity: humidity,
      light: light,
      tempe: tempe
    }
  },

  onLoad: function () {
    var wheatherData = this.convert();

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();

    //新建光照强度图表
    lineChart_light = new myCharts({
      canvasId: 'light',
      type: 'area',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: '最近游戏时刻[0表示长按开始 1表示进行中]',
        data: wheatherData.light,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '最近游戏时刻',
        format: function (val) {
          return (val.toFixed(2)/1024);
        },
        min: 0,
        max: 1,
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    //新建饼状图
    new myCharts({
      animation: true, //是否有动画
      canvasId: 'tempe',
      type: 'pie',
      series: [{
        name: '充电时间',
        data: 20,
      }, {
        name: '烫手时间',
        data: 15,
      }, {
        name: '休眠时间',
        data: 80,
      }],
      width: windowWidth,
      height: 250,
      dataLabel: true,
    });
  },


})