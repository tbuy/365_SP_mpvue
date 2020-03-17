<template>
  <div class="video">
    <video
      id="myVideo"
      :poster="video.picture_url"
      :src="video.video_src"
      controls
      bindwaiting="waitingFun"
      autoplay
    ></video>
    <div class="content">
      <div class="first">
        <div class="name">{{ video.name }}</div>
        <div>主讲人：{{ video.teacher }}</div>
      </div>
      <div class="second">
        <div class="title">简介</div>
        <van-image width="100%" height="100%" fit="cover" lazy-load :src="video.video_detail_url"/>
      </div>
    </div>
  </div>
</template>
<script>
import { otherService } from "../../request";

export default {
  data() {
    return {
      video: {},
      id: 0
    };
  },
  methods: {
    async getVideo() {
      this.video = await otherService.getVideo(this.id);
    }
  },
  mounted() {
    this.getVideo();
  },
  onLoad(options) {
    this.id = options.id;
  }
};
</script>
<style scoped>
video {
  width: 100%;
}
.content {
  color: rgb(87, 87, 87);
  font-size: 26rpx;
  line-height: 50rpx;
}
.first {
  padding: 0 40rpx;
}
.name {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.second {
  border-top: 1rpx solid #f5f5f5;
  padding-top: 20rpx;
  margin: 20rpx 0;
}
.title {
  font-size: 40rpx;
  color: rgb(87, 87, 87);
  padding: 0 40rpx;
}
image {
  width: 100%;
  margin-top: 20rpx;
}
</style>
