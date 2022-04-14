<template>
  <div class="slideruserbar">
    <div class="slider-body">
      <div class="slider-top">
        <ul>
          <li>
            <router-link to="/Home/LeftMyWeibo"
              ><i class="icon-flickr"></i>我的微博</router-link
            >
          </li>
          <li>
            <router-link to="/Home/LeftMyPic"
              ><i class="icon-images"></i>我的照片</router-link
            >
          </li>
          <li>
            <router-link to="/PersonalCenter"
              ><i class="icon-profile"></i>个人中心</router-link
            >
          </li>
          <li>
            <router-link to="/Setting"
              ><i class="icon-cog"></i>设置</router-link
            >
          </li>
        </ul>
      </div>
      <transition name="slider-bottom">
        <div class="slider-bottom" v-if="showLogoutFlag">
          <span @click="logout"><i class="icon-undo2"></i>登出</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderUserBar',
  data() {
    return {
      showLogoutFlag: this.hasLoginFlag,
      componentAlive: true
    };
  },
  props: {
    // from app.vue
    hasLoginFlag: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logout() {
      var user = JSON.parse(JSON.stringify(sessionStorage));
      var usernameFromSession = Object.keys(user)[0];
      var a = confirm(`确定登出 ${usernameFromSession} 的微博账号吗`);
      if (a) {
        sessionStorage.clear();
        this.showLogoutFlag = false;
        this.$emit('HeaderBarAlive', {
          showLogoutFlag: this.showLogoutFlag,
          componentAlive: this.componentAlive
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.slideruserbar {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  background-color: #16161a;
  border: 1px solid #333;
  border-radius: 8px 0 0 8px;
  margin-top: 60px;
}

.slider-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .slider-top {
    width: 100%;
    ul {
      margin: 20px 5px 10px;
      li {
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 0;
          font-size: 14px;
          border-radius: 90% 10% 10% 90%;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #ff9820;
          }
          i {
            padding-right: 10px;
          }
          .icon-profile:before {
            content: '\e923';
          }
          .icon-flickr:before {
            content: '\eaa3';
          }
          .icon-images:before {
            content: '\e90e';
          }
          .icon-cog:before {
            content: '\e994';
          }
        }
      }
    }
  }
  .slider-bottom {
    width: 100%;
    background-color: rgba(196, 123, 14, 0.397);
    margin-top: 10px;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      font-size: 16px;
      color: #ff9820;
      transition: all 0.6s;
      cursor: pointer;
      &:hover {
        transform: translateX(-25px);
      }
      i {
        padding-right: 10px;
      }
      .icon-undo2:before {
        content: '\e967';
      }
    }
  }

  .slider-bottom-enter,
  .slider-bottom-leave-to {
    opacity: 0;
  }
  .slider-bottom-enter-active,
  .slider-bottom-leave-active {
    transition: all 0.5s;
  }
  .slider-bottom-leave,
  .slider-bottom-enter-to {
    opacity: 1;
  }
}
</style>