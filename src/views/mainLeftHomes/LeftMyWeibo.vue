<template>
  <div class="leftMyWeibo">
    <ul class="leftMyWeibo-ul">
      <li
        class="leftMyWeibo-ul-li"
        v-for="item in weiboDataAll"
        :key="item.dataList.weiboId"
      >
        <!-- 头像和用户名 -->
        <header class="weibo-header">
          <div class="header-info">
            <a href="javascript:;" class="header-info-protrait">
              <img :src="protrait" alt="网络错误，无法显示图片！" />
            </a>
            <div class="header-info-username-box">
              <div class="header-info-username">{{ username }}</div>
              <div class="header-info-date">{{ item.dataList.postDate }}</div>
            </div>
          </div>
          <div
            class="header-subscribe"
            v-if="item.removeButtonShowFlag"
            @click="removeWeibo(item.dataList.weiboId)"
          >
            <i class="icon-bin"></i>删除
          </div>
        </header>
        <!-- 图片 -->
        <div class="weibo-body">
          <div class="weibo-body-p">{{ item.dataList.textarea }}</div>
          <div class="weibo-body-pictures">
            <div
              class="weibo-body-pictures-num"
              v-for="pic in item.dataList.picsDataList"
              :key="pic.imgId"
            >
              <div v-lazy-container="{ selector: 'img' }">
                <img
                  :data-src="pic.uploadImg"
                  alt="网络错误，无法显示图片！"
                  :data-flag="`${pic.imgFlag}`"
                  @click="scalePic($event)"
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { plugins, throttle } from '@/api/plugins.js';
import { mapState } from 'vuex';

export default {
  name: 'LeftMyWeibo',
  data() {
    return {
      username: '',
      protrait: '',
      rememberScroll: 0 // 记录滚动条位置
    };
  },
  methods: {
    // 鼠标点击 放大图片
    scalePic(e) {
      plugins.scalePic(e);
    },
    // 删除微博
    removeWeibo: throttle(function (id) {
      this.$store.commit('MYWEIBO/removeWeibo', id);
    }, 500)
  },
  computed: {
    ...mapState({ weiboDataAll: (state) => state.MYWEIBO.weiboDataAll })
  },
  activated() {
    // 返回页面时 回到之前滚动位置
    window.scrollTo(0, this.rememberScroll);
    // 获取用户名和头像
    var usernameFromSession = Object.keys(
      JSON.parse(JSON.stringify(sessionStorage))
    )[0];
    var protraitFromLocal = JSON.parse(
      localStorage.getItem(usernameFromSession)
    ).protrait;
    this.username = usernameFromSession;
    this.protrait = protraitFromLocal;
  },
  // 离开页面时记录下当前页面滚动位置
  beforeRouteLeave(to, from, next) {
    this.rememberScroll = window.scrollY;
    next();
  }
};
</script>

<style lang="less">
.leftMyWeibo-ul {
  .leftMyWeibo-ul-li {
    padding: 10px;
    border: 1px solid #222;
    border-radius: 8px;
    background-color: #16161a;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    .weibo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      .header-info {
        display: flex;
        align-items: center;

        .header-info-protrait {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid #333;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .header-info-username-box {
          display: flex;
          flex-direction: column;
          padding-left: 10px;

          .header-info-username {
            color: #ea8011;
            margin-bottom: 5px;
          }
          .header-info-date {
            color: #808080;
            font-size: 12px;
          }
        }
      }

      .header-subscribe {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55px;
        height: 24px;
        font-size: 12px;
        border-radius: 15px;
        border: 1px solid #333;
        color: #808080;
        cursor: pointer;

        .icon-bin:before {
          content: '\e9ac';
          margin-right: 4px;
        }
      }
    }

    .weibo-body {
      padding: 10px 10px 10px 70px;

      .weibo-body-p {
        margin-bottom: 40px;
        color: #eee;
        font-size: 14px;
      }

      .weibo-body-pictures {
        display: flex;
        flex-wrap: wrap;

        .weibo-body-pictures-num {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          &:not(:nth-child(3n)) {
            margin-right: 6px;
          }
          &:nth-child(n) {
            margin-bottom: 6px;
          }
          img {
            position: relative;
            width: 100%;
            height: 100%;
            cursor: pointer;
            border: 1px solid #333;
            border-radius: 8px;
          }
        }
      }
    }
  }
}
</style>