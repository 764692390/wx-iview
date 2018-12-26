Page({
    onShareAppMessage() {
        return {
            title: 'iView Weapp',
            imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
        };
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    }
});