<template>
  <scroll-view
    scroll-y="true"
    :style="{ height: height + 'px' }"
    @scrolltolower="loadingMore"
  >
    <slot></slot>
  </scroll-view>
</template>
<script>
export default {
  data() {
    return {
      height: 0
    };
  },
  methods: {
    loadingMore() {
      this.$emit("loadingMore");
    }
  },
  mounted() {
    wx.getSystemInfo({
      success: res => {
        this.height = res.windowHeight;
      }
    });
  }
};
</script>
