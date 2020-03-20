var Fly = require("flyio/dist/npm/wx")
var fly = new Fly

fly.interceptors.request.use((request) => {
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    request.headers = {
        "X-Tag": "flyio",
        'Content-Type': 'application/json',
    }

    return request;
})

fly.interceptors.response.use(
    (response) => {
        if (response.data.code == 1) {
            wx.hideLoading();

            wx.showToast({
                title: response.data.message,
                icon: "none",
                duration: 800,
                mask: true
            });
        } else {
            wx.hideLoading();
            return response.data.data
        }


    },
    (err) => {
        wx.hideLoading();
        return Promise.reject(err)
    }
)

export default fly;