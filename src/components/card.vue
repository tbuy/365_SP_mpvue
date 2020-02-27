<template>
  <div>
    <p class="card">
      {{ text }}
    </p>
    <div>
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["text"]
};
</script>

<style>
.card {
  padding: 10px;
}
</style>
