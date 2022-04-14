<template>
  <div class="setting">
    <div class="setting-box">
      <div class="cancel" @click="cancel">返回</div>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/api/plugins.js';
export default {
  name: 'Setting',
  methods: {
    cancel: throttle(function () {
      this.$router.go(-1);
    }, 500)
  }
};
</script>

<style lang="less" scoped>
.setting {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #111;
  .setting-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;
    background-color: #333;
    color: #eee;
    border-radius: 25px;
    box-shadow: 0 0 8px 4px #ff8200;
    .cancel {
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #222;
      color: #eee;
      border-radius: 20px;
      transition: all 0.3s;
      &:hover {
        color: #ff8200;
        border: 1px solid #ff8200;
        transform: rotateZ(-8deg);
      }
    }
  }
}
</style>