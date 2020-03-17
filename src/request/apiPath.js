const apiPath = 'https://user.sy365.cn';

module.exports = {
  //获取验证码 get {phone}
  getCaptcha: apiPath + "/staff/getCaptcha",

  //登录 post {phone,captcha}
  login: apiPath + "/staff/login",

  //获取订单列表(懒加载) get {lastId,pageNumber}
  getOrderList: apiPath + "/staff/order/getOrderList",

  //获取单个订单信息 get {id}
  getOrder: apiPath + "/staff/order/getOrder",

  //获取视频列表(懒加载) get {lastId,pageNumber}
  getVideoList: apiPath + "/staff/common/getVideoList",

  //获取单个视频 get {id}
  getVideo: apiPath + "/staff/common/getVideo",

  //广告位
  getAdPosition: apiPath + "/staff/common/getAdPosition",
}