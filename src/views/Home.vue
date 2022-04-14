<template>
  <div class="home">
    <keep-alive>
      <router-view name="LeftMyWeibo"></router-view>
      <router-view name="LeftMyPic"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style>
</style>