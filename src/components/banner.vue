<template>
  <swiper
    indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}"
    interval="{{interval}}"
    duration="{{duration}}"
  >
    <block wx:for="{{bannerImage}}" wx:key="{{item.id}}">
      <swiper-item>
        <image
          src="{{item.url}}"
          class="slide-image"
          bindtap="goAdPositionContent"
          data-item="{{item}}"
        />
      </swiper-item>
    </block>
  </swiper>
</template>
<script>
export default {
  props: {
    bannerImage: {},

    options: {
      type: Object,
      default: {
        //轮播
        //轮播点
        indicatorDots: true,
        autoplay: true,
        //时间间隔
        interval: 3000,
        //滑动时长
        duration: 400,
        height: ""
      }
    }
  }
};
</script>
