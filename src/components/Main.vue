<template>
  <div class="main">
    <div class="left">
      <MainLeft></MainLeft>
    </div>
    <div class="middle">
      <MainMiddle></MainMiddle>
    </div>
    <div class="right">
      <MainRight></MainRight>
      <div class="copy-right">
        <CopyRight></CopyRight>
      </div>
    </div>
  </div>
</template>

<script>
import MainLeft from "@/components/MainLeft.vue";
import MainMiddle from "@/components/MainMiddle.vue";
import MainRight from "@/components/MainRight.vue";
import CopyRight from "@/components/CopyRight.vue";

export default {
  name: "Main",
  components: {
    MainLeft,
    MainMiddle,
    MainRight,
    CopyRight,
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  // height: 100%;
  .left {
    // flex: 1;
    position: sticky;
    top: 60px;
    width: 200px;
    height: 800px;
    background-color: #16161a;
    border-radius: 8px;
    border: 1px solid #222;
  }
  .middle {
    // flex: 3.5;
    width: 650px;
    margin: 0 10px;
  }
  .right {
    // flex: 1.5;
    position: sticky;
    top: 60px;
    width: 250px;
    height: 100%;
    .copy-right {
      position: absolute;
      bottom: -180px;
      left: 0;
      margin-top: 10px;
    }
  }
}
</style>