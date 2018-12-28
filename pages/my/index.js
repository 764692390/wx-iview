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
    signOut() {
        try {
            wx.clearStorageSync()
        } catch (e) {
            console.log(e)
        }   
        wx.navigateTo({
            url: "/pages/authorize/index"
        })
    },

    onLoad:function(){
        
       
    },


    onShow:function(){
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