<template>
  <div class="leftmypic">
    <div class="mypic">
      <div class="mypic-header">
        <div class="mypic-header-protrait">
          <img :src="protrait" alt="网络错误，无法显示图片！" />
        </div>
        <div class="mypic-header-username">{{ username }}</div>
      </div>
      <div class="mypic-body">
        <div class="mypic-body-p" v-if="showWeiboHintFlag">
          {{ weiboHint }}
        </div>
        <div class="mypic-body-pics" ref="myPicBodyPics">
          <div
            class="mypic-body-pics-num"
            v-for="item in myWeiboPics"
            :key="item.imgId"
          >
            <div v-lazy-container="{ selector: 'img' }">
              <img
                :data-src="item.uploadImg"
                alt="网络错误，无法显示图片！"
                :data-flag="`${item.imgFlag}`"
                @click="scalePic($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plugins } from '@/api/plugins.js';
import { mapState } from 'vuex';

export default {
  name: 'LeftMyPic',
  data() {
    return {
      username: '',
      protrait: '',
      weiboHint: '还没有一张照片，快去发布吧！',
      showWeiboHintFlag: false, // 是否显示微博提示（还没有图片 请发布）
      tempArr: [], // 临时的arr 用来存放每一个发布微博里的图片
      myWeiboPics: [], // 总的图片数据 把每一个发布的微博图片都整合到一起
      rememberScroll: 0 // 记录滚动条位置
    };
  },
  computed: {
    ...mapState({ weiboDataAll: (state) => state.MYWEIBO.weiboDataAll })
  },
  methods: {
    scalePic(e) {
      plugins.scalePic(e);
    }
  },
  activated() {
    // // 获取微博里的所有图片整合到一个数组里
    // 先判断weiboDataList里有没有提示信息
    let temp = this.weiboDataAll.some(
      (item) => item.dataList.firstFlag === true
    );
    // 如果有 说明还没有发布微博 是图片清空 显示微博提示
    if (temp) {
      this.myWeiboPics = [];
      this.showWeiboHintFlag = true;
    } else {
      // 每次先把里面的数据先清空 再去查找图片 再去push图片
      // 因为这个页面时keepAlive的所有每次activatd都会出发一次 所以每次必须先清空
      // 如果不写在activated里 写在created 只有第一次出发 之后普通的路由切换不会出发
      // 例如在LeftMyWeibo中删除一个包含图片微博的时候 按道理来说 页面切回来要更新 但没有 所以我们要把代码写在activated里
      this.tempArr = [];
      this.myWeiboPics = [];
      // 如果没有 则整理里面的图片信息
      this.weiboDataAll.forEach((item) => {
        // 建立一个arr 把每一个微博的所有照片都放进去
        let arr = [];
        item.dataList.picsDataList.forEach((picsData) => {
          arr.push(picsData);
        });
        // 再把每个微博整合
        this.tempArr.push(...arr);
      });
      // 赋值给总的 myWeiboPics
      this.myWeiboPics = this.tempArr;
      // 不显示微博提示
      this.showWeiboHintFlag = false;
    }

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

<style lang="less" scoped>
.mypic {
  display: flex;
  flex-direction: column;
  border: 1px solid #222;
  border-radius: 8px;
  background-color: #16161a;
  .mypic-header {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    .mypic-header-protrait {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #333;
        border-radius: 50%;
      }
    }
    .mypic-header-username {
      padding-left: 10px;
    }
  }
  .mypic-body {
    padding: 10px 20px 60px 70px;

    .mypic-body-p {
      margin-bottom: 40px;
      color: #eee;
      font-size: 14px;
    }

    .mypic-body-pics {
      display: flex;
      flex-wrap: wrap;

      .mypic-body-pics-num {
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
</style>