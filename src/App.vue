<template>
  <div class="app">
    <div class="headercenter">
      <div class="centerlogo">
        <i class="icon-sina-weibo"></i>
        <strong><em>微博YA</em></strong>
      </div>
      <div class="centersearch" ref="myCentersearch">
        <i class="icon-search"></i>
        <input
          type="text"
          name="search"
          placeholder="搜索微博YA"
          v-model.trim.lazy="bigSearchValue"
        />
        <button>搜索</button>
      </div>
    </div>
    <video
      class="earthBackground"
      src="images/weibo_login.mp4"
      autoplay
      loop
      preload="true"
      muted="false"
    ></video>
    <!-- HeaderBar -->
    <transition name="headerfade">
      <HeaderBar
        :showSliderFlag="showSliderFlag"
        @sliderChange="showSlider"
        v-if="showHeaderBarFlag"
      ></HeaderBar>
    </transition>
    <!-- SliderUserBar -->
    <transition name="slidefade">
      <SliderUserBar
        :hasLoginFlag="hasLoginFlag"
        @HeaderBarAlive="HeaderBarAlive"
        v-if="showSliderFlag"
      ></SliderUserBar>
    </transition>
    <!-- Main -->
    <div class="mainbody">
      <Main></Main>
    </div>
    <!-- backTopTop -->
    <transition name="backToTop">
      <div class="backTop" v-if="showBackTopFlag" @click="backToTop">
        <img src="./assets/images/backTop.png" title="爬爬爬" alt="图片没啦" />
      </div>
    </transition>
    <!-- LoginPage -->
    <router-view name="LoginPage"></router-view>
    <!-- RegisterPage -->
    <router-view name="RegisterPage"></router-view>
    <!-- PersonalCenter -->
    <router-view name="PersonalCenter"></router-view>
    <!-- Setting -->
    <router-view name="Setting"></router-view>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
import SliderUserBar from '@/components/SliderUserBar.vue';
import Main from '@/components/Main.vue';

export default {
  data() {
    return {
      bigSearchValue: '', // 大搜索框
      showHeaderBarFlag: false, // 是否显示 headerBar
      showSliderFlag: false, // 是否显示 sliderUserBar
      hasSliderBeforeFlag: true, // 上一次路由前 sliderUserBar 有没有打开
      storeSliderBeforeflag: false, // 记录下上一次 sliderUserBar 是否打开的值
      showBackTopFlag: false, // 是否显示 backToTop
      scrollTop: '', // 页面滚动高度
      showLoginFlag: false, // 路由 LoginPage 显示时，隐藏HeaderBar
      currentPath: '', // 当前路由的路径
      hasLoginFlag: false // 判断用户是否已经登陆
    };
  },
  methods: {
    // 是否显示sliderUserBar
    showSlider(value) {
      this.showSliderFlag = value;
    },
    // 点击登出按钮后 从sliderUserBar传来值 改变hasLoginFlag值 判断是否登出，使用nextTick 刷新组件 使组件内容更新
    HeaderBarAlive(value) {
      this.showHeaderBarFlag = false;
      this.hasLoginFlag = value.showLogoutFlag;
      this.$nextTick(() => {
        this.showHeaderBarFlag = value.componentAlive;
      });
    },
    // 滚动页面 判断是否显示头部和backToTop
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var centersearchOffsetTop = this.$refs.myCentersearch.offsetTop;
      if (this.scrollTop >= centersearchOffsetTop + 50) {
        // 路由 LoginPage 和 RegisterPage 显示时，隐藏 HeaderBar 和 backToTop 和 SliderUserBar
        if (
          this.currentPath === '/LoginPage' ||
          this.currentPath === '/RegisterPage' ||
          this.currentPath === '/PersonalCenter' ||
          this.currentPath === '/Setting'
        ) {
          this.showHeaderBarFlag = false;
          this.showBackTopFlag = false;
        } else {
          this.showHeaderBarFlag = true;
          this.showBackTopFlag = true;
        }
      } else {
        this.showHeaderBarFlag = false;
        this.showBackTopFlag = false;
        this.showSliderFlag = false;
      }
    },
    backToTop() {
      let timer = null,
        _this = this;
      cancelAnimationFrame(timer);
      // requsetAnimationFrame 类似于 setTimeout 和 setInterval，他会根据浏览器的刷新频率来用帧去重绘，一般用于制作css动画。
      // 因为是根据浏览器刷新频率来的，保持最佳绘制效率，所以所做的动画不会出现卡顿或者失帧，不会因为间隔时间过短，造成过度绘制，增加开销。可以节省系统资源，提高性能和改善视觉效果。
      //
      // requestIdleCallback 利用帧的空闲时间去执行一些操作，比如说预加载js或者css文件，或者对用户的点击、滚动操作进行数据分析并上报，还可以用来检测是否卡顿。
      timer = requestAnimationFrame(function fn() {
        if (_this.scrollTop > 0) {
          _this.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop =
            _this.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _this.showBackTopFlag = false;
        }
      });
    }
  },
  watch: {
    // 监听上一次 sliderUserBar 是否显示
    showSliderFlag: {
      handler(newValue, oldValue) {
        this.hasSliderBeforeFlag = oldValue;
      }
    },
    $route(newValue, oldValue) {
      // 监听是否切换到 /LoginPage，如果为 /LoginPage 则不显示 HeaderBar 和 backToTop，反之显示
      if (
        newValue.path === '/LoginPage' ||
        newValue.path === '/RegisterPage' ||
        newValue.path === '/PersonalCenter' ||
        newValue.path === '/Setting'
      ) {
        this.currentPath = newValue.path;
        this.showHeaderBarFlag = false;
        this.showBackTopFlag = false;
        // 判断上一次 sliderUserBar 是否显示 如果显示 则返回原页面后也要显示 反之不显示
        if (this.hasSliderBeforeFlag === false) {
          this.showSliderFlag = false;
          // 储存上次一个 sliderUserBar 是否打开的值
          this.storeSliderBeforeflag = true;
        } else {
          this.showSliderFlag = false;
          this.storeSliderBeforeflag = false;
        }
      } else if (
        oldValue.path === '/LoginPage' ||
        oldValue.path === '/RegisterPage' ||
        oldValue.path === '/PersonalCenter' ||
        oldValue.path === '/Setting'
      ) {
        this.currentPath = '';
        this.showHeaderBarFlag = true;
        this.showBackTopFlag = true;
        if (this.storeSliderBeforeflag === false) {
          this.showSliderFlag = false;
        } else {
          this.showSliderFlag = true;
        }
      }

      // 在路由跳转时 判断是否登陆 如果 sessionStorage 不为空 说明用户登陆了 sliderUserBar 显示登出按钮
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        this.hasLoginFlag = true;
        // 如果登陆了 获取其用户名
      } else {
        this.hasLoginFlag = false;
      }
    }
  },
  components: {
    HeaderBar,
    SliderUserBar,
    Main
  },
  beforeCreate() {
    // 佛祖保佑
    console.log(
      [
        '                   _ooOoo_',
        '                  o8888888o',
        '                  88" . "88',
        '                  (| -_- |)',
        '                  O\\  =  /O',
        "               ____/`---'\\____",
        "             .'  \\\\|     |//  `.",
        '            /  \\\\|||  :  |||//  \\',
        '           /  _||||| -:- |||||-  \\',
        '           |   | \\\\\\  -  /// |   |',
        "           | \\_|  ''\\---/''  |   |",
        '           \\  .-\\__  `-`  ___/-. /',
        "         ___`. .'  /--.--\\  `. . __",
        '      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
        '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
        '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
        "======`-.____`-.___\\_____/___.-`____.-'======",
        "                   `=---='",
        '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
        '            佛祖保佑       永无BUG'
      ].join('\n')
    );

    // document
    //   .querySelector('body')
    //   .setAttribute('style', 'background-color: #0c0c0c');
  },
  created() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color: #0c0c0c');
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style');
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style lang="less" scoped>
.headercenter {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 330px;
  color: aliceblue;
  .centerlogo {
    position: relative;
    font-size: 60px;
    margin-bottom: 20px;
    .icon-sina-weibo:before {
      position: absolute;
      top: -2%;
      left: -35%;
      content: '\ea9a';
      color: #f00;
      font-size: 70px;
    }
  }
  .centersearch {
    position: relative;
    width: 800px;
    height: 50px;
    border-radius: 25px;
    .icon-search:before {
      content: '\e986';
      position: absolute;
      top: 12px;
      left: 20px;
      font-size: 26px;
      color: #eee;
    }
    input {
      width: 610px;
      height: 100%;
      background-color: #25252c;
      color: #eee;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      padding-left: 70px;
      padding-right: 20px;

      &:focus {
        border: 1px solid #ff8200;
        color: #ff8200;
      }
    }
    button {
      position: absolute;
      top: 0;
      right: 10px;
      width: 90px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      font-size: 20px;
      background-color: #ff8200;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      cursor: pointer;
      &:hover {
        background-color: #e54f00;
      }
    }
  }
}

.earthBackground {
  height: 330px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain;
  z-index: -1;
}

.headerfade-enter,
.headerfade-leave-to,
.backToTop-enter,
.backToTop-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.headerfade-enter-active,
.headerfade-leave-active,
.backToTop-enter-active,
.backToTop-leave-active {
  transition: all 0.8s;
}
.headerfade-enter-to,
.headerfade-leave,
.backToTop-enter-to,
.backToTop-leave {
  transform: translateY(0);
  opacity: 1;
}

.slidefade-enter,
.slidefade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slidefade-enter-active,
.slidefade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slidefade-enter-to,
.slidefade-leave {
  transform: translateX(0);
  opacity: 1;
}

.mainbody {
  width: 77%;
  margin: 350px auto 0;
}

.backTop {
  position: fixed;
  top: 0;
  left: 4.5%;
  width: 70px;
  height: 90%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}
</style>
