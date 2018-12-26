Page({
    data: {
        current: 'homepage',
        imgUrls: [
            '../../images/banner.png',
            '../../images/banner.png',
            '../../images/banner.png',
          ],
          indicatorDots: true,
          autoplay: true,
          interval: 5000,
          duration: 1000,
          circular: true,
    },

    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    }
     
});