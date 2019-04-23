//获取应用实例
var app = getApp()

Page({
  data: {
    logList: [],
    rows: 10, // 一页显示多少条
    index: 1, //  当前页
    pagesize: null, // 一共多少页
    hasNoCoupons: true,
    loadingMoreHidden: true, // 是否到底

  },
  toDub(str) {
    return str < 10 ? '0' + str : str
  },
  // 格式化时间
  tsFormatTimer(ts) {
    var dateTime = new Date(ts);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var timeSpanStr = year + '-' + this.toDub(month) + '-' + this.toDub(day) + ' ' + this.toDub(hour) + ':' + this.toDub(minute) + ':' + this.toDub(second);
    return timeSpanStr;
  },
  onLoad: function () {

  },
  onShow: function () {
    this.getLogoList();
  },
  getLogoList() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    // 获取文章分页
    wx.request({
      header: {
        Authorization: `Bearer ${wx.getStorageSync('Token')}`
      },
      url: app.globalData.subDomain + '/workUser/getList',
      data: {
        rows: this.data.rows,
        index: this.data.index,
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        }, 500)
        if (res.data.errno === "0") {
          console.log(res)
          var size = Math.ceil(res.data.data.count / that.data.rows)
          if (size >= that.data.index) {
            that.setData({
              pagesize: size
            })

            let array = res.data.data.rows;
            console.log(array)
            // 格式化时间
            array.forEach(element => {
              element.InterviewTimer = that.tsFormatTimer(element.InterviewTimer).split(' ')[0];
            });
            console.log(array)
            if (that.data.index != 1) {
              var logList = that.data.logList.concat(array)
              that.setData({
                hasNoCoupons: false,
                logList: logList
              })
            } else {
              that.setData({
                hasNoCoupons: false,
                logList: array
              })
            }
          } else {
            that.setData({
              loadingMoreHidden: false
            })
          }
        } else {
          wx.navigateTo({
            url: "/pages/authorize/index"
          })
        }
      }
    })
  },
  // 上拉加载
  onReachBottom: function (e) {
    console.log(e)
    if (this.data.pagesize >= this.data.index) {
      this.setData({
        index: this.data.index + 1
      });
      this.getLogoList();
    }
  },
  // 下拉刷新
  onPullDownRefresh: function (e) {
    console.log(e)
    this.setData({
      index: 1,
    });
    this.getLogoList()

  }


});