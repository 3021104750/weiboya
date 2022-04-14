<template>
  <div class="mainleft">
    <router-view name="MainLeftHome"></router-view>
    <router-view name="MainLeftHot"></router-view>
    <router-view name="MainLeftUpload"></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainLeft'
};
</script>

<style lang="less" scoped>
.mainleft {
  padding-top: 10px;
}
</style>