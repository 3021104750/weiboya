<template>
  <div class="mainright">
    <div class="hotnews-title">
      <span>微博热搜</span>
      <button class="hotnews-refresh" @click="getRefreshData">
        <i class="icon-spinner11"></i>
        <span>点击刷新</span>
      </button>
    </div>
    <ul>
      <li v-for="(item, index) in data" :key="item.id">
        <a href="javascript:;"
          ><strong>{{ index + 1 }}</strong
          ><span>{{ item.hotNews }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { debounceLater } from '@/api/plugins.js';
import { mapState } from 'vuex';
export default {
  name: 'MainRight',
  computed: {
    ...mapState({ data: (state) => state.MAINRIGHT.data }),
    ...mapState({ dataCount: (state) => state.MAINRIGHT.dataCount })
  },
  methods: {
    // 每次点击刷新热搜的时候 节流
    getRefreshData: debounceLater(function () {
      this.$store.commit('MAINRIGHT/refreshData', this.dataCount);
      this.$store.commit('MAINRIGHT/initData');
    }, 600)
  },
  created() {
    this.$store.commit('MAINRIGHT/initData');
    this.$store.commit('MAINRIGHT/initDataLength');
  }
};
</script>

<style lang="less" scoped>
.mainright {
  padding-top: 15px;
  background-color: #16161a;
  border: 1px solid #222;
  border-radius: 8px;
  height: max-content;
  .hotnews-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    span {
      color: #eee;
    }
    .hotnews-refresh {
      display: flex;
      align-items: center;
      background-color: transparent;
      color: #333;
      font-size: 12px;
      cursor: pointer;
      .icon-spinner11:before {
        content: '\e984';
        font-size: 14px;
        margin-right: 5px;
      }
      span {
        border-radius: 10px;
        background-color: #666;
        padding: 2px 4px;
        color: #333;
      }
    }
  }
  ul {
    width: 100%;
    li {
      height: 20px;
      padding: 10px 20px;
      a {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        transition: all 0.2s;
        &:hover {
          border-right: 2px solid #ea8011;
        }
        strong {
          display: inline-block;
          width: 12px;
          font-size: 16px;
          padding: 0 15px 0 6px;
          color: #ea8011;
        }
        span {
          font-size: 14px;
        }
      }
      &:nth-child(-n + 3) a strong {
        color: #f26d5f;
      }
    }
  }
}
</style>