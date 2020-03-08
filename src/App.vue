<script>
import Vue from "vue";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }
    Vue.prototype.$utils = {
      showToast: this.showToast,
      login: this.login,
      getUserInfo: this.getUserInfo
    };
  },
  log() {
    console.log(`log at:${Date.now()}`);
  },
  methods: {
    showToast(msg) {
      wx.showToast({
        title: msg,
        icon: "none",
        duration: 800,
        mask: true
      });
    },
    //获取用户信息
    getUserInfo() {
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: val => {
                console.log(val);
              }
            });
          } else {
            console.log(2);
          }
        }
      });
    },
    //检查是否登录 登录返回ture 未登录返回false
    checkLogin() {
      if (wx.getStorageSync("accessToken")) {
        // 检查 session_key 是否过期
        wx.checkSession({
          // session_key 未过期
          success: () => {
            // 直接从Storage中获取用户信息
            if (wx.getStorageSync("userInfo")) {
              this.userInfo = JSON.parse(wx.getStorageSync("userInfo"));
              wx.setStorageSync("isLogin", true);
            } else {
              this.showToast("缓存信息缺失");
              wx.setStorageSync("isLogin", false);
            }
          },
          // session_key 过期
          fail: () => {
            this.showToast("缓存信息缺失");
            wx.setStorageSync("isLogin", false);
          }
        });
      } else {
        wx.setStorageSync("isLogin", false);
      }
    },
    login(phone, captcha, callback) {
      wx.login({
        success: loginRes => {
          if (loginRes.code) {
            /**
             * 服务器登录接口
             * phone 手机号
             * captcha 验证码
             * code 临时登录凭证
             * rawData 用户非敏感信息
             * signature 签名
             * encryptedData 用户敏感信息
             * iv 解密算法的向量
             */
            this.$http
              .post(apiPath.login, {
                phone: phone,
                captcha: captcha,
                code: loginRes.code,
                rawData: this.detail.rawData,
                signature: this.detail.signature,
                encryptedData: this.detail.encryptedData,
                iv: this.detail.iv
              })
              .then(res => {
                if (res.code == 0) {
                  let _userInfo = {
                    id: res.data.id,
                    name: res.data.name,
                    icon: res.data.icon,
                    phone: res.data.phone
                  };
                  wx.setStorageSync("userInfo", JSON.stringify(_userInfo));
                  wx.setStorageSync("accessToken", res.data.access_token);
                  wx.setStorageSync("isLogin", true);
                  callback();
                }
              });
          } else {
            this.showToast("登录失败");
          }
        },
        fail: () => {
          this.showToast("登录失败");
        }
      });
    }
  }
};
</script>

<style>
.container {
  font-size: 28rpx;
}
.pub_card {
  width: 100%;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.pub_card_item {
  box-shadow: 5rpx 5rpx 10rpx #f5f5f5;
  background-color: #fff;
  border: 1rpx solid #f5f5f5;
  padding: 20rpx 30rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  display: flex;
}
.pub-icon {
  color: rgb(105, 105, 105);
}
.pub-color {
  color: #ff7832;
}
</style>
