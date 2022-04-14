<template>
  <div class="mainleftupload">
    <div class="post-button">
      <button @click="postWeibo"><i class="icon-reply"></i>发布微博</button>
    </div>
    <div class="post-hint" ref="myHint"></div>
  </div>
</template>

<script>
import { plugins, getTime, throttle } from '@/api/plugins.js';
import { eventBus } from '@/eventBus/eventBus.js';

export default {
  name: 'MainLeftUpload',
  data() {
    return {
      textarea: '',
      picsDataList: [],
      hasKeepAliveFlag: false // 点击了发布微博按钮要销毁组件
    };
  },
  methods: {
    // 点击发布微博按钮
    postWeibo: throttle(function () {
      // 判断 textarea 和 picDataList 是否为空 为空说明用户没有编辑信息 不能发布微博 return掉
      if (this.textarea === '' && this.picsDataList.length === 0) {
        plugins.domShowTimeout(this.$refs.myHint, '你还未编辑微博哦！');
        return;
      }
      let dataList = {
        textarea: this.textarea,
        picsDataList: this.picsDataList,
        postDate: getTime() // 发布微博时获取当前日期
      };
      this.$store.commit('MYWEIBO/getWeiboDataList', dataList);
      // to MainMiddleUpload.vue 判断用户是否点击了发布微博按钮 然后清除页面信息
      eventBus.$emit('getPostFlag', this.hasKeepAliveFlag);
      // 点击后进入 我的微博页面
      this.$router.push({ path: '/Home/LeftMyWeibo' });
    }, 500)
  },

  created() {
    // from MainMiddleUpload.vue 上传微博发布的内容 整理下信息
    eventBus.$on('sendWeiboDataList', (value) => {
      this.textarea = value.textarea;
      // 把为空的图片去除 过滤出有链接的图片
      this.picsDataList = value.picsDataList.filter(
        (item) => item.uploadImg !== ''
      );
    });
  },

  deactivated() {
    eventBus.$off('sendWeiboDataList');
  }
};
</script>

<style lang="less" scoped>
.post-button {
  height: 40px;
  margin: 10px;
  font-size: 14px;
  button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #16161a;
    color: #d3d3d3;
    cursor: pointer;
    i {
      margin: 0 10px;
      font-size: 20px;
    }
    &:hover {
      color: #ff9820;
      background-color: #333;
      border-radius: 8px;
      i {
        color: #ff9820;
      }
    }
    .icon-reply:before {
      content: '\e96a';
    }
  }
}

.post-hint {
  display: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: 700;
  color: red;
}
</style>