<template>
  <div class="mainmiddle">
    <router-view name="Home"></router-view>
    <router-view name="Hot"></router-view>
    <keep-alive>
      <router-view name="MainMiddleUpload"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'MainMiddle'
};
</script>

<style lang="less" scoped>
</style>