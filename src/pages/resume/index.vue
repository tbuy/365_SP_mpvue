<template>
  <div class="resume">
    <form action="">
      <div class="title">求职意向(最多选5个)</div>
      <div class="tag-wrap">
        <div v-for="item in taglist" :key="item.id" class="tag" @click="select(item)">
          <van-tag color="#f2826a" :plain="item.plain" size="large">{{item.title}}</van-tag>
        </div>
      </div>
      <div class="title">基本信息</div>
      <div class="input">
        <van-field
          :value="resume.name"
          type="text"
          name="name"
          maxlength="10"
          label="姓名"
          placeholder="请输入姓名"
          input-align="right"
          clearable
        />
        <van-field
          :value="resume.age"
          type="text"
          name="age"
          label="年龄"
          input-align="right"
          placeholder="请输入年龄"
          clearable
        />
        <van-field
          :value="resume.sex"
          type="text"
          name="sex"
          label="性别"
          input-align="right"
          placeholder="请输入年龄"
          clearable
        />
        <van-field
          :value="resume.address"
          type="text"
          name="address"
          label="地址"
          placeholder="请输入地址"
          input-align="right"
          clearable
        />
        <van-field
          :value="resume.phone"
          type="text"
          name="phone"
          label="联系方式"
          input-align="right"
          placeholder="请输入联系方式"
          clearable
        />
        <van-field
          :value="resume.salary"
          type="text"
          name="salary"
          label="期望薪资"
          placeholder="请输入期望薪资"
          input-align="right"
          clearable
        />
      </div>
      <div class="title">工作经历</div>
      <div class="input-textarea">
        <van-field :value="resume.experience" maxlength="50" type="textarea"/>
      </div>
      <div class="title">自我介绍</div>
      <div class="input-textarea">
        <van-field :value="resume.introduce" type="textarea" maxlength="50"/>
      </div>
    </form>
    <div class="btn">
      <van-button type="primary" @click="save" size="normal" color="#f2826a">保存</van-button>
      <van-button type="primary" plain @click="save" size="normal" class="save" color="#f2826a">预览</van-button>
    </div>
  </div>
</template>
<script>
import { store } from "../../store";
import { loginService, otherService } from "../../request";
export default {
  data() {
    return {
      resume: {
        name: "",
        age: "",
        sex: "",
        salary: "",
        address: "",
        phone: "",
        experience: "",
        introduce: "",
        uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
        tag: []
      },
      plain: true,

      taglist: [
        { id: 1, title: "保姆", plain: true },
        { id: 2, title: "保洁", plain: true },
        { id: 3, title: "家政", plain: true },
        { id: 4, title: "月嫂", plain: true },
        { id: 5, title: "育儿", plain: true },
        { id: 6, title: "擦玻璃", plain: true }
      ]
    };
  },
  computed: {},
  methods: {
    select(item) {
      item.plain = false;
    },
    save() {
      wx.navigateBack();
    }
  },
  async mounted() {}
};
</script>
<style scoped>
.tag-wrap {
  display: flex;
  padding: 0 20rpx;
  flex-wrap: wrap;
}
.tag {
  margin: 10rpx 10rpx;
}
.title {
  padding: 20rpx 40rpx;
}
.btn {
  margin: 10rpx 0 50rpx;
  text-align: center;
}

.input-textarea >>> textarea {
  height: 200rpx;
  padding: 30rpx;
  box-sizing: border-box;
  background-color: #f8f8f8;
}
.input-textarea >>> .van-cell:after {
  border: 0 none;
}
.btn >>> .van-button {
  padding: 0 60rpx !important;
  margin: 20rpx;
}
</style>
