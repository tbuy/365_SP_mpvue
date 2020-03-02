<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs;
    if (mpvuePlatform === "my") {
      logs = mpvue.getStorageSync({ key: "logs" }).data || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync({
        key: "logs",
        data: logs
      });
    } else {
      logs = mpvue.getStorageSync("logs") || [];
      logs.unshift(Date.now());
      mpvue.setStorageSync("logs", logs);
    }
  },
  log() {
    console.log(`log at:${Date.now()}`);
  }
};
</script>

<style>
.container {
  font-size: 28rpx;
}
.pub_card {
  width: 100%;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}

.pub_card_item {
  box-shadow: 5rpx 5rpx 10rpx #f5f5f5;
  background-color: #fff;
  border: 1rpx solid #f5f5f5;
  padding: 20rpx 30rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  display: flex;
}
.pub-icon {
  color: rgb(105, 105, 105);
}
</style>
