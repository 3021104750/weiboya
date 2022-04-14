<template>
  <div class="hot">
    <keep-alive>
      <router-view name="LeftHotNews"></router-view>
      <router-view name="LeftWenyu"></router-view>
      <router-view name="LeftYaowen"></router-view>
      <router-view name="LeftHuati"></router-view>
      <router-view name="LeftLocal"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Hot'
};
</script>

<style>
</style>