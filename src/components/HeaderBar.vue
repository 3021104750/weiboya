<template>
  <div class="headerbar">
    <div class="weibologo">
      <router-link class="logo icon-sina-weibo" to="/Hot" title="微博ya"
        >微博YA</router-link
      >
    </div>
    <div class="searchbar icon-search">
      <input
        type="text"
        name="search"
        placeholder="搜索微博YA"
        v-model.trim.lazy="smallSearchValue"
      />
    </div>
    <div class="headernavbar">
      <div class="headernav-icon">
        <router-link to="/Home" active-class="activeclass"
          ><i class="icon-home2"></i
        ></router-link>
        <router-link to="/Hot" active-class="activeclass"
          ><i class="icon-fire"></i
        ></router-link>
        <router-link to="/MainMiddleUpload" active-class="activeclass"
          ><i class="icon-instagram"></i
        ></router-link>
      </div>
    </div>
    <div class="loginbar" v-if="!hasLoginFlag">
      <ul>
        <li>
          <router-link to="/LoginPage">登陆</router-link>
        </li>
        <li>
          <router-link to="/RegisterPage">注册</router-link>
        </li>
      </ul>
    </div>
    <div class="userbar" v-if="hasLoginFlag">
      <span
        ><img :src="loginUserProtrait" alt="网络错误，无法显示图片！" /><strong
          >{{ loginUsername }}</strong
        >
        欢迎您！</span
      >
    </div>
    <div class="usermode">
      <div class="usermode-icon" href="javascript:;" @click="showSlider">
        <i class="icon-user"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      smallSearchValue: '',
      // 是否打开 sliderUserBar
      sliderFlag: this.showSliderFlag,
      // 判断是否显示 userbar
      hasLoginFlag: false,
      // 已登陆用户的用户名
      loginUsername: '用户未登陆',
      // 已登陆用户的头像
      loginUserProtrait: '../assets/logo.png'
    };
  },
  props: {
    // from App.vue
    showSliderFlag: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    showSlider() {
      if (this.sliderFlag) {
        this.sliderFlag = false;
      } else {
        this.sliderFlag = true;
      }
      // emit to App.vue
      this.$emit('sliderChange', this.sliderFlag);
    }
  },
  mounted() {
    let obj = JSON.stringify(sessionStorage);
    if (obj !== '{}') {
      this.hasLoginFlag = true;
      // 如果登陆了 获取其用户名
      this.loginUsername = Object.keys(JSON.parse(obj))[0];
      this.loginUserProtrait = JSON.parse(
        localStorage.getItem('korin')
      ).protrait; // 如果登陆了 获取其头像
    } else {
      this.hasLoginFlag = false;
      this.loginUsername = '';
    }
  }
};
</script>

<style lang="less" scoped>
.headerbar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 60px;
  background-color: #16161a;
  border-top: 2px solid #ff8200;
  z-index: 99;
  .weibologo,
  .searchbar,
  .headernavbar,
  .loginbar,
  .usermode {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.weibologo,
.usermode {
  position: relative;
  width: 150px;
  height: 100%;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-10%, -50%);
    font-size: 22px;
    font-style: italic;
  }
  .icon-sina-weibo:before {
    content: '\ea9a';
    color: #f00;
    position: absolute;
    top: -40%;
    left: -65%;
    font-size: 40px;
  }
  .usermode-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 20px;
    cursor: pointer;
    .icon-user:before {
      content: '\e971';
      color: #f36126;
      font-size: 20px;
    }
    &:hover {
      .icon-user::before {
        color: #ca3a1f;
        font-size: 25px;
      }
    }
  }
}

.searchbar,
.loginbar,
.userbar {
  position: relative;
  width: 250px;
  height: 100%;
  input {
    background-color: #25252c;
    width: 100%;
    height: 30px;
    padding: 0 10px 0 40px;
    margin: 4px 20px 0;
    border-radius: 18px;
    color: #fff;
    &:focus {
      border: 1px solid #ff8200;
      color: #ff8200;
    }
  }
  ul {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0 18px;
      font-size: 14px;
      border-bottom: 1px solid #f36126;
      border-radius: 5px;
      &:hover {
        border-radius: 10px;
        border-bottom: 2px solid #ca3a1f;
      }
      a {
        text-align: center;
        line-height: 60px;
        width: 100%;
        height: 100%;
      }
    }
  }
  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #eee;
    strong {
      color: #f36126;
      margin-right: 10px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #222;
      margin-right: 10px;
    }
  }
}

.icon-search:before {
  content: '\e986';
  position: absolute;
  top: 22px;
  left: 30px;
  font-size: 22px;
  color: #eee;
}

.headernavbar {
  flex: 1;
  .headernav-icon {
    display: flex;
    width: 100%;
    height: 100%;
    .activeclass {
      i {
        color: #f36126;
      }
      border-bottom: 2px solid #ff8200;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 28px;
      margin: 0 60px;
      height: 100%;
      &:hover {
        i {
          transition: all 1s;
          transform: rotate(360deg);
        }
        border-bottom: 2px solid #ff8200;
      }
    }
    .icon-home2:before {
      content: '\e901';
    }
    .icon-fire:before {
      content: '\e9a9';
    }
    .icon-instagram:before {
      content: '\ea92';
    }
  }
}
</style>