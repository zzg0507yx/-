var amap = require('../../libs/amap-wx.js');
Page({
  data: {
    formIdArr: [],
    showmark: false,
    aroundList: [
      {
        name: '烫手大学',
        id: '141201'
      },
      {
        name: '烫手公园',
        id: '110101'
      }
    ],
    markersData: [],
    textData: {},
    status: null,
    latitude: null,
    longitude: null,
    markers: [],
    points: [],
    location: '',
    name: '',
    address: '',

  },
  onLoad: function () {
    var _this = this;
    _this.setData({
      showmark: false,
    }
    );
    //小程序获取当前位置api,下面的图片路径请自行按照个人文件路径添加
    wx.getLocation({
      type: 'gcj02',
      success(data) {
        if (data) {
          _this.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers: [{
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              iconPath: '/images/location.png',
              width: 32,
              height: 32
            }]
          });
        }
      }
    });
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(that.data.markersData, id);
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      showmark: true
    }
    );
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });

  },

  getType(e) {//获取选择的附近关键词，同时更新状态

    this.setData({
      status: e.currentTarget.dataset.type,
      showmark: false
    });
    this.getAround(e.currentTarget.dataset.keywords, e.currentTarget.dataset.type);
  },

  getAround(keywords, types) {//通过关键词获取附近的点，只取前十个，同时保证十个点在地图中显示
    var _this = this;
    var myAmap = new amap.AMapWX({ key: '8409abd39286712eb94c2d34a6ae194f' });
    myAmap.getPoiAround({
      iconPath: '/images/location.png',
      iconPathSelected: '/images/selectlocation.png',
      querykeywords: keywords,
      querytypes: types,
      location: _this.data.location,
      success(data) {
        if (data.markers) {
          _this.setData({
            markersData: data.markers
          })

          var markers = [], points = [];
          for (var value of data.markers) {

            if (value.id == 0) {
              _this.setData({
                name: value.name,
                address: value.address,
              })
            }
            markers.push({
              id: value.id,
              latitude: value.latitude,
              longitude: value.longitude,
              title: value.name,
              iconPath: value.iconPath,
              width: 30,
              height: 30,
              anchor: { x: .5, y: 1 },
            });
            points.push({
              latitude: value.latitude,
              longitude: value.longitude
            })
          }
          _this.setData({
            markers: markers,
            points: points
          })
        }
      }, fail: function (info) {
        wx.showToast({ title: info })
      }
    })
  },
})