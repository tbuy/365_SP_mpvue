<template>
  <div class="order">
    <div class="order-card">
      <div class="title ellipsis">{{ order.work_type }}</div>
      <div class="price">{{ order.wage || "面议" }}</div>
      <div class="public">
        <div class="pub-content">
          <van-icon name="clock-o" class="pub-icon icon"/>
          <text>{{ order.service_duration || "面议" }}</text>
        </div>
        <div class="pub-content">
          <van-icon name="location-o" class="pub-icon icon"/>
          <text>{{ order.service_address || "面议" }}</text>
        </div>
      </div>
    </div>
    <div class="detail-title" v-if="order.order_details">岗位职责</div>
    <div class="detail">{{ order.order_details }}</div>
    <div class="button">
      <van-button type="primary" size="large" @click="call" color="#ff7832">立即抢单</van-button>
    </div>
  </div>
</template>
<script>
import card from "../../components/card.vue";
import { otherService } from "../../request";

export default {
  data() {
    return {
      order: {},
      id: 0
    };
  },
  components: {
    card
  },
  methods: {
    async getOrder() {
      this.order = await otherService.getOrder(this.id);
    },
    call() {
      otherService.makePhoneCall(this.order.agent_manager_phone);
    }
  },
  mounted() {
    this.getOrder();
  },
  onLoad(options) {
    this.id = options.id;
  }
};
</script>
<style scoped>
.order {
  padding: 20rpx 40rpx;
  background-color: #fff;
  margin-top: 20rpx;
}
.order-card {
  width: 100%;
  background-color: fff;
  border-radius: 10rpx;
  box-shadow: 10rpx 10rpx 10rpx #f5f5f5;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
}

.title {
  font-weight: 700;
  font-size: 32rpx;
  line-height: 60rpx;
  padding: 30rpx 30rpx 0;
}

.price {
  line-height: 60rpx;
  padding: 0 30rpx 10px;
  font-size: 30rpx;
  color: #ff7832;
  border-bottom: 1px dotted #f5f5f5;
}
.public {
  padding: 20rpx 30rpx;
}
.pub-content {
  line-height: 50rpx;
}
image {
  width: 30rpx;
  height: 30rpx;
  vertical-align: middle;
}

text {
  font-size: 28rpx;
  color: #888;
  vertical-align: middle;
  margin-left: 20rpx;
}

.detail-title {
  margin-top: 50rpx;
  font-size: 32rpx;
  padding: 0 20rpx;
}

.detail {
  padding: 0 20rpx;
  font-size: 28rpx;
  margin-top: 20rpx;
  color: #888;
}
.button {
  position: fixed;
  bottom: 40rpx;
  left: 40rpx;
  right: 40rpx;
}
</style>
