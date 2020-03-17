<script>
import Vue from "vue";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {},
  methods: {
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
