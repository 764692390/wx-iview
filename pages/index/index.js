Page({
    data: {
        imgUrls: [
          'https://blog.jczxw.cn/uploadFile/banner1.jpg',
          'https://blog.jczxw.cn/uploadFile/banner2.jpg',
          'https://blog.jczxw.cn/uploadFile/banner3.jpg',
        ],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        circular: true,
        swiperCurrent: 0
    },
    swiperChange(e) {
        let current = e.detail.current;
        let that = this;
        that.setData({
          swiperCurrent: current,
        })
    },
   
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '教育模板首页',
            path: '/pages/index/index',
            success: function (res) {
            // 转发成功
            console.log("转发成功")
            },
            fail: function (res) {
            // 转发失败
            onsole.log("转发失败")
            }
        }
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },
    onShow:function(){ 
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
        if (!userInfo) {
            wx.navigateTo({
                url: "/pages/authorize/index"
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
        }  
    },

});