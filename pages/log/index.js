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
        scrollTop: 0,


    },
    onLoad: function () {
        this.getLogoList();
    },
    onPageScroll(e) {
        let scrollTop = this.data.scrollTop
        this.setData({
          scrollTop: e.scrollTop
        })
       },
    getLogoList() {
        wx.showLoading({
            title: '加载中...',
        })
        var that = this;
        // 获取文章分页
        wx.request({
          url: app.globalData.subDomain + '/userLog/getList',
          data: {
            rows: this.data.rows,
            index: this.data.index,
          },
          success: function (res) {
            setTimeout( () => {
                wx.hideLoading();
            } ,500)
            if (res.data.errno === "0") {
                console.log(res)
                var size = Math.ceil(res.data.data.count/that.data.rows)
                console.log(size)
                if( size >= that.data.index) {
                    that.setData({
                        pagesize: size
                    })
                    if( that.data.index != 1) {
                        var logList = that.data.logList.concat(res.data.data.rows)
                        that.setData({
                            hasNoCoupons: false,
                            logList: logList
                        })
                    } else {
                        that.setData({
                            hasNoCoupons: false,
                            logList:  res.data.data.rows
                        })
                    }
                } else {
                    that.setData({
                        loadingMoreHidden: false
                    })
                }
            }
          }
        })
    },
    // 上拉加载
    onReachBottom: function (e) {
        if(this.data.pagesize >= this.data.index) {
        this.setData({
            index: this.data.index+1
        });
        this.getLogoList();
        }
    },
    // 下拉刷新
    onPullDownRefresh: function(e){
        console.log(1);
        this.setData({
            index:1,
        });
        this.getLogoList()
    }

     
});