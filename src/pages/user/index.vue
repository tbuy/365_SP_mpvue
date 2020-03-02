<template>
  <div class="userPage">
    <div class="topContainer">
      <div class="image">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          lazy-load
          src="/static/images/avatar.png"
        />
      </div>
      <div class="name">
        <div>请点击登录</div>
      </div>
    </div>
    <div class="bottomContainer">
      <div
        v-for="item in menuList"
        :key="item.id"
        class="item"
        @click="goItem(item)"
      >
        <van-icon :name="item.iconClass" class="pub-icon item-icon" />
        <div class="item-title">{{ item.title }}</div>
        <van-icon name="arrow" class="pub-icon item-right" />
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";
export default {
  data() {
    return {
      menuList: [
        //   {
        //   id: 1,
        //   iconClass: 'icon-order',
        //   title: '求职意向',
        //   router: '/pages/intention/intention'
        // },
        {
          id: 2,
          iconClass: "description",
          title: "我的简历",
          router: ""
        },
        {
          id: 3,
          iconClass: "notes-o",
          title: "阿姨手册",
          router: ""
        },
        {
          id: 4,
          iconClass: "info-o",
          title: "帮助中心",
          router: ""
        },
        {
          id: 5,
          iconClass: "service-o",
          title: "意见反馈",
          router: ""
        }
      ],
      isLogin: false,
      userName: "",
      icon: ""
    };
  },
  methods: {
    //退出登录
    logout() {
      wx.clearStorageSync();
      app.showLoading();
      setTimeout(() => {
        app.hideLoading(0);
        wx.reLaunch({ url: "/pages/user/user" });
      }, 800);
    },
    goItem(item) {
      if (item.id == 5) {
        wx.makePhoneCall({
          phoneNumber: config.phone
        });
      } else {
        wx.showToast({
          title: "敬请期待",
          icon: "none",
          duration: 800,
          mask: true
        });
      }
    }
  }
};
</script>
<style scoped>
.userPage {
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
}

.topContainer {
  height: 240rpx;
  overflow: hidden;
  display: flex;
  box-shadow: 5rpx 5rpx 20rpx #d8d6d6;
}
.image {
  margin-top: 60rpx;
  margin-left: 80rpx;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 2rpx solid #f5f5f5;
}

.name {
  margin-left: 40rpx;
  line-height: 240rpx;
  font-size: 34rpx;
  color: rgb(87, 87, 87);
}

.bottomContainer {
  margin-top: 20rpx;
}
.item {
  height: 120rpx;
  line-height: 120rpx;
  color: rgb(87, 87, 87);
  display: flex;
  font-size: 34rpx;
  border-bottom: 0.1rpx solid #f5f5f5;
}

.item-icon {
  font-size: 40rpx;
  margin: 0 20rpx 0 30rpx;
  color: rgb(87, 87, 87);
}
.item-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.item-right {
  margin-right: 50rpx;
}
</style>
