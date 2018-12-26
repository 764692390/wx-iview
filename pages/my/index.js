Page({
    data: {
        current: 'my',
        userImg: '',
        userInfo: null
    },

    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },


    onShow:function(){
       
    },

    onLoad:function(){
        let that = this
        let userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo);
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