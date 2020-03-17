<template>
  <div>
    <swiper
      :indicator-dots="options.indicatorDots"
      :autoplay="options.autoplay"
      :interval="options.interval"
      :duration="options.duration"
    >
      <div class="banner">
        <swiper-item v-for="item in bannerImage" :key="item.id">
          <van-image width="100%" height="100%" fit="cover" lazy-load :src="item.url"></van-image>
        </swiper-item>
      </div>
    </swiper>
    <div class="orderList">
      <scroll @loadingMore="loadingMore">
        <div
          class="pub_card"
          v-for="item in orderList"
          :key="item.id"
          @click="goOrderContent(item.id)"
        >
          <div class="pub_card_item">
            <div class="oneline">
              <div class="title">{{ item.work_type || "面议" }}</div>
              <div class="price">{{ item.wage || "面议" }}</div>
            </div>
            <div class="text">
              <van-icon name="clock-o" class="pub-icon icon"/>
              {{
              item.service_duration || "面议"
              }}
            </div>
            <div class="text">
              <van-icon name="location-o" class="pub-icon icon"/>
              {{
              item.service_address || "面议"
              }}
            </div>
            <div class="time">{{ item.created_at }}</div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import card from "../../components/card.vue";
import scroll from "../../components/scroll.vue";
import { otherService } from "../../request";
export default {
  data() {
    return {
      bannerImage: [],
      orderList: [],
      lastId: 0,
      pageNumber: 6,
      isLast: false,
      options: {
        //轮播点
        indicatorDots: true,
        autoplay: true,
        //时间间隔
        interval: 3000,
        //滑动时长
        duration: 400
      }
    };
  },

  components: {
    card,
    scroll
  },

  methods: {
    async getAdPosition() {
      let _data = await otherService.getAdPosition();
      this.bannerImage = _data["S000007"]["resource"];
    },
    async getOrderList() {
      let _data = await otherService.getOrderList(this.lastId, this.pageNumber);
      this.orderList = [...this.orderList, ..._data.data];
      this.lastId = _data.lastId;
      this.isLast = _data.isLast;
    },
    goOrderContent(id) {
      wx.navigateTo({
        url: "/pages/orderContent/main?id=" + id
      });
    },
    loadingMore() {
      if (!this.isLast) {
        this.getOrderList();
      } else {
        this.$utils.showToast("没有更多");
      }
    }
  },
  mounted() {
    this.getAdPosition();
    this.getOrderList();
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 320rpx;
}
.orderList {
  margin-top: 30rpx;
  font-size: 32rpx;
}
.pub_card_item {
  display: block;
}
.oneline {
  display: flex;
  justify-content: space-between;
}
.title {
  width: 40%;
  font-weight: 700;
  line-height: 60rpx;
}

.price {
  line-height: 60rpx;
  font-size: 30rpx;
  color: #ff7832;
}
text {
  font-size: 28rpx;
  line-height: 60rpx;

  color: #888;
  vertical-align: middle;
  margin-left: 20rpx;
}
.time {
  color: #b6b6b6;
  line-height: 60rpx;

  font-size: 28rpx;
  margin-top: 15rpx;
}
.icon {
  line-height: 60rpx;
  margin-right: 10rpx;
  font-size: 26rpx;
}
</style>
