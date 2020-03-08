var Fly = require("flyio/dist/npm/wx")
var fly = new Fly
//添加请求拦截器
fly.interceptors.request.use((request) => {
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    //给所有请求添加自定义header
    request.headers = {
        "X-Tag": "flyio",
        'Content-Type': 'application/json',
    }

    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        if (response.data.code == 1) {
            wx.showToast({
                title: response.data.message,
                icon: "none",
                duration: 800,
                mask: true
            });
            wx.hideLoading();

        } else {
            wx.hideLoading();

            //只将请求结果的data字段返回
            return response.data.data
        }


    },
    (err) => {
        wx.hideLoading();
        //发生网络错误后会走到这里
        return Promise.resolve(err)
    }
)

export default fly;