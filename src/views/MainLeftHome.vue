<template>
  <div class="mainlefthome">
    <ul>
      <li v-for="(item, index) in list" :key="item.id">
        <router-link :to="routerlinkList[index]" active-class="activeclass"
          ><i :class="iconList[index]"></i>{{ item }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainLeftHome",
  data() {
    return {
      list: ["我的微博", "我的照片"],
      iconList: ["icon-flickr", "icon-images"],
      routerlinkList: ["/Home/LeftMyWeibo", "/Home/LeftMyPic"],
    };
  },
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  li {
    height: 40px;
    margin: 10px;
    font-size: 14px;
    .activeclass,
    a:hover {
      color: #ff9820;
      background-color: #333;
      border-radius: 8px;
      i {
        color: #ff9820;
      }
    }
    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      i {
        color: #d3d3d3;
        margin: 0 10px;
        font-size: 20px;
      }
      .icon-flickr:before {
        content: "\eaa3";
      }
      .icon-images:before {
        content: "\e90e";
      }
    }
  }
}
</style>