<template>
  <div class="wrap">
    <form>
      <div class="input">
        <van-field
          :value="phone"
          type="number"
          name="手机号"
          placeholder="请输入手机号"
          maxlength="11"
          @input="phoneInput"
        />
        <div class="getCode" @click="getCode">
          <span v-if="!isShowTime">获取验证码</span>
          <span v-else>{{time}}s</span>
        </div>
      </div>
      <div class="input">
        <van-field
          :value="captcha"
          type="number"
          name="验证码"
          maxlength="6"
          placeholder="请输入验证码"
          @input="captchaInput"
        />
      </div>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          color="#ff7832"
          :disabled="!isHeightlight"
          @click="formSubmit"
        >登录</van-button>
      </div>
    </form>
  </div>
</template>
<script>
import { loginService } from "../../request";
import { store } from "../../store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      phone: "",
      captcha: "",
      time: 60,
      isShowTime: false
    };
  },
  computed: {
    isHeightlight() {
      return this.phone > 0 && this.captcha > 0 ? true : false;
    },
    ...mapState({
      isLogin: state => {
        return state.isLogin;
      }
    })
  },
  methods: {
    async formSubmit(e) {
      let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!regPhone.test(this.phone)) {
        this.$utils.showToast("请输入正确手机号");
      } else if (this.captcha == "" || this.captcha < 6) {
        this.$utils.showToast("请输入正确验证码");
      } else {
        let reault = await loginService.login(this.phone, this.captcha);
        setTimeout(() => {
          if (this.isLogin) {
            wx.reLaunch({ url: "/pages/user/main" });
          }
        }, 300);
      }
    },

    getCode() {
      if (this.isShowTime) {
        return false;
      }
      if (this.phone.length < 11) {
        this.$utils.showToast("请输入正确手机号");
      } else {
        loginService.getCaptcha(this.phone, () => {
          this.isShowTime = true;
          let oldTime = new Date().getTime();
          let newTime, time, timer;
          timer = setInterval(() => {
            newTime = new Date().getTime();
            time = Math.round((newTime - oldTime) / 1000);
            if (time < 60) {
              this.time = 60 - time;
            } else {
              clearInterval(timer);
              this.time = 60;
              this.isShowTime = false;
            }
          }, 500);
        });
      }
    },
    phoneInput(e) {
      this.phone = e.mp.detail;
    },
    captchaInput(e) {
      this.captcha = e.mp.detail;
    }
  },
  mounted() {
    this.phone = "";
    this.captcha = "";
  }
};
</script>
<style scoped>
.wrap {
  height: 100%;
  padding: 200rpx 80rpx;
  box-sizing: border-box;
}

.input {
  margin-bottom: 30rpx;
  position: relative;
}

.getCode {
  position: absolute;
  right: 30rpx;
  top: 30rpx;
  color: #ccc;
  font-size: 26rpx;
  z-index: 2;
}
</style>
