<template>
  <div class="userPage">
    <div class="topContainer">
      <div class="image">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          lazy-load
          :src="userInfo.icon?userInfo.icon: '/static/images/avatar.png'"
        />
      </div>
      <div class="name">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="!userInfo.phone">请点击登录</button>
        <div v-else>{{userInfo.name||userInfo.phone}}</div>
      </div>
    </div>
    <div class="bottomContainer">
      <div v-for="item in menuList" :key="item.id" class="item" @click="goItem(item)">
        <van-icon :name="item.iconClass" class="pub-icon item-icon"/>
        <div class="item-title">{{ item.title }}</div>
        <van-icon name="arrow" class="pub-icon item-right"/>
      </div>
    </div>
    <div class="logout" v-if="userInfo.phone">
      <van-button plain type="primary" size="large" @click="logout" color="#ccc">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import { store } from "../../store";
import { loginService, otherService } from "../../request";
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
  computed: {
    userInfo: () => store.state.userInfo,
    isLogin: () => store.state.isLogin
  },
  methods: {
    getUserInfo(e) {
      let _mpData = e.mp.detail;
      if (_mpData.encryptedData) {
        loginService.getUserInfo(_mpData);
        wx.navigateTo({
          url: "/pages/login/main"
        });
      } else {
        this.$utils.showToast("已拒绝");
      }
    },
    logout() {
      wx.showLoading();
      setTimeout(() => {
        loginService.logout();
        wx.hideLoading();
      }, 800);
    },
    goItem(item) {
      if (item.id == 5) {
        otherService.makePhoneCall("");
      } else {
        this.$utils.showToast("敬请期待");
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
.logout {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
}
button {
  background-color: #fff;
  color: rgb(87, 87, 87);
  font-size: 34rpx;
  line-height: 240rpx;
}
button:after {
  border: 0 none !important;
}
</style>
