<template>
  <div class="mainlefthot">
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
  name: 'MainLeftHot',
  data() {
    return {
      list: ['热搜榜', '文娱榜', '要闻榜', '话题榜', '同城榜'],
      iconList: [
        'icon-smile',
        'icon-tongue',
        'icon-wink',
        'icon-grin',
        'icon-cool'
      ],
      routerlinkList: [
        '/Hot/LeftHotNews',
        '/Hot/LeftWenyu',
        '/Hot/LeftYaowen',
        '/Hot/LeftHuati',
        '/Hot/LeftLocal'
      ]
    };
  }
};
</script>

<style lang="less" scoped>
ul {
  li {
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 14px;
    margin: 10px;
    a {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      i {
        font-size: 20px;
        padding: 0 10px;
        color: #d3d3d3;
      }
      .icon-smile:before {
        content: '\e9e1';
      }
      .icon-tongue:before {
        content: '\e9e3';
      }
      .icon-wink:before {
        content: '\e9e7';
      }
      .icon-grin:before {
        content: '\e9e9';
      }
      .icon-cool:before {
        content: '\e9eb';
      }
    }
  }
  .activeclass,
  a:hover {
    color: #ff9820;
    background-color: #333;
    border-radius: 8px;
    i {
      color: #ff9820;
    }
  }
}
</style>