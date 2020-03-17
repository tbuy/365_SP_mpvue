<template>
  <div class="videolist">
    <scroll @loadingMore="loadingMore">
      <div
        class="pub_card"
        v-for="item in videoList"
        :key="item.id"
        @click="goVideoContent(item.id)"
      >
        <div class="pub_card_item">
          <div class="leftImage">
            <van-image width="100%" height="100%" fit="cover" lazy-load :src="item.picture_url"/>
          </div>
          <div class="rightContent">
            <div class="title">{{ item.name }}</div>
            <div>{{ item.teacher }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import card from "../../components/card.vue";
import scroll from "../../components/scroll.vue";
import { otherService } from "../../request";

export default {
  data() {
    return {
      videoList: [],
      lastId: 0,
      pageNumber: 6,
      isLast: false
    };
  },
  components: {
    card,
    scroll
  },
  filters: {},
  computed: {},
  methods: {
    goVideoContent(id) {
      wx.navigateTo({
        url: "/pages/videoContent/main?id=" + id
      });
    },
    async getVideoList() {
      let _data = await otherService.getVideoList(this.lastId, this.pageNumber);
      this.videoList = [...this.videoList, ..._data.data];
      this.lastId = _data.lastId;
      this.isLast = _data.isLast;
    },
    loadingMore() {
      if (!this.isLast) {
        this.getVideoList();
      } else {
        this.$utils.showToast("没有更多");
      }
    }
  },
  mounted() {
    this.getVideoList();
  }
};
</script>

<style scoped>
.leftImage {
  width: 250rpx;
  height: 150rpx;
  border-radius: 6rpx;
  background-color: rgb(243, 243, 243);
  overflow: hidden;
}
.rightContent {
  margin-left: 40rpx;
  font-size: 26rpx;
  padding: 10rpx 0;
}
.title {
  font-size: 30rpx;
  height: 80rpx;
  margin-bottom: 10rpx;
  overflow: hidden;
}
</style>
