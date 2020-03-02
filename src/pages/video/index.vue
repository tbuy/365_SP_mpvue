<template>
  <div class="videolist">
    <scroll @loadingMore="loadingMore">
      <div
        class="pub_card"
        v-for="item in videoList"
        :key="item.id"
        @click="goVideoContent(id)"
      >
        <div class="pub_card_item">
          <div class="leftImage">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              lazy-load
              :src="item.picture_url"
            />
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
import apiPath from "../../request/apiPath.js";
import utils from "../../utils/index";
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
    getVideoList() {
      this.$http
        .get(apiPath.getVideoList, {
          lastId: this.lastId,
          pageNumber: this.pageNumber
        })
        .then(res => {
          this.videoList = [...this.videoList, ...res.data];
          this.lastId = res.lastId;
          this.isLast = res.isLast;
        });
    },
    loadingMore() {
      if (!this.isLast) {
        this.getVideoList();
      } else {
        wx.showToast({
          title: "没有更多",
          icon: "none",
          duration: 800,
          mask: true
        });
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
