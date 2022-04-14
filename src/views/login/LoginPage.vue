<template>
  <div class="loginpage">
    <div class="loginbox">
      <form action="">
        <h3>请登录微博</h3>
        <label for="username">账号：</label
        ><input
          type="text"
          name="username"
          id="username"
          v-model.trim.lazy="usernameValue"
          placeholder="请输入账号"
        />
        <label for="password">密码：</label
        ><input
          type="password"
          name="password"
          id="password"
          ref="myPassword"
          v-model.trim.lazy="passwordValue"
          placeholder="请输入密码"
        />
        <i class="icon-eye" ref="myIconEye" @click="changePasswordState"></i>
        <span>
          <button class="login" type="submit" @click.prevent="submit">
            登陆
          </button>
          <button class="cancel" @click.prevent="cancel">返回</button>
        </span>
      </form>
      <div class="hint" ref="myHint"></div>
    </div>
  </div>
</template>

<script>
import { plugins, throttle } from '@/api/plugins.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      usernameValue: '',
      passwordValue: ''
    };
  },
  methods: {
    // 登陆
    submit: throttle(function () {
      if (!window.localStorage || !window.sessionStorage) {
        alert('浏览器不支持 localStorage 或 sessionStorage，无法登陆！');
      } else {
        if (this.usernameValue === '') {
          plugins.domShowTimeout(this.$refs.myHint, '账号不能为空哟！');
          return;
        } else if (this.passwordValue === '') {
          plugins.domShowTimeout(this.$refs.myHint, '密码不能为空哟！');
          return;
        } else if (!this.passwordValue.match(/^[A-Z]+/)) {
          plugins.domShowTimeout(this.$refs.myHint, '密码开头必须大写哟！');
          return;
        }
        let getUsernameFromStore = JSON.parse(JSON.stringify(localStorage));
        let resultFlag = false;
        let resultHint = '';
        // 遍历 localStorage 是否存在此账号
        for (var k in getUsernameFromStore) {
          if (k === this.usernameValue) {
            // 判断账号和密码是否匹配
            if (
              JSON.parse(getUsernameFromStore[k]).password ===
              this.passwordValue
            ) {
              resultFlag = true;
              resultHint = '登陆成功！';
              break;
            } else {
              resultFlag = false;
              resultHint = '密码输入错误！';
              break;
            }
          } else {
            resultFlag = false;
            resultHint = '账号不存在！';
          }
        }
        // 如果账号和密码正确 则进入登陆前的页面 否则无法登陆显示提示
        if (resultFlag) {
          sessionStorage.setItem(this.usernameValue, '登录啦');
          plugins.domShowTimeout(this.$refs.myHint, resultHint);
          setTimeout(() => {
            this.$router.push({ path: this.$route.query.previousPath });
          }, 500);
        } else {
          plugins.domShowTimeout(this.$refs.myHint, resultHint);
          return;
        }
      }
    }, 500),
    // 返回
    cancel: throttle(function () {
      this.$router.go(-1);
    }, 500),
    // 密码是否可看或不可看
    changePasswordState() {
      if (this.$refs.myIconEye.className === 'icon-eye') {
        this.$refs.myIconEye.className = 'icon-eye-blocked';
        this.$refs.myPassword.type = 'text';
      } else {
        this.$refs.myIconEye.className = 'icon-eye';
        this.$refs.myPassword.type = 'password';
      }
    }
  }
};
</script>

<style lang='less' scoped>
.loginpage {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #16161a;
  .loginbox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    width: 400px;
    height: 270px;
    border-radius: 25px;
    background-color: #333;
    color: #eee;
    box-shadow: 0 0 8px 4px #ff8200;
    form {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      h3 {
        margin-bottom: 20px;
        font-size: 20px;
      }
      #username,
      #password {
        width: 300px;
        height: 30px;
        background-color: #666;
        border-radius: 15px;
        margin: 8px 0 10px 4px;
        padding: 0 18px;
        color: #ff8200;
        &:focus {
          border-left: 1px solid #ff8200;
          border-right: 1px solid #ff8200;
        }
      }
      #password {
        margin-bottom: 16px;
      }
      i {
        position: absolute;
        top: 167px;
        right: 44px;
        cursor: pointer;
      }
      .icon-eye:before {
        content: '\e9ce';
      }
      .icon-eye-blocked:before {
        content: '\e9d1';
      }
      span {
        .login,
        .cancel {
          width: 80px;
          height: 40px;
          background-color: #222;
          color: #eee;
          border-radius: 20px;
          transition: all 0.3s;
          &:hover {
            color: #ff8200;
            border: 1px solid #ff8200;
            transform: rotateZ(-8deg);
          }
        }
        .login {
          margin-right: 20px;
        }
      }
    }

    .hint {
      display: none;
      width: 260px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px dashed #f10;
      border-radius: 15px;
      margin: 30px 0 0 80px;
    }
  }
}
</style>
