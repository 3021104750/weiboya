<template>
  <div class="registerpage">
    <div class="registerbox">
      <form action="">
        <h3>请注册微博</h3>
        <label for="username">账号：</label
        ><input
          type="text"
          name="username"
          id="username"
          v-model.trim.lazy="usernameValue"
          placeholder="请输入账号"
        />
        <label for="tel">电话：</label>
        <input
          type="tel"
          name="tel"
          id="tel"
          placeholder="请输入电话"
          v-model.trim.lazy="telValue"
        />
        <label for="email">邮箱：</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="请输入邮箱"
          v-model.trim.lazy="emailValue"
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
        <i
          class="icon-eye first-icon"
          ref="myIconEye1"
          @click="changePasswordState1"
        ></i>
        <label for="password">重复密码：</label
        ><input
          type="password"
          name="passwordRepeat"
          id="passwordRepeat"
          ref="myPasswordRepeat"
          v-model.trim.lazy="passwordRepeatValue"
          placeholder="再次输入密码"
        />
        <i
          class="icon-eye second-icon"
          ref="myIconEye2"
          @click="changePasswordState2"
        ></i>
        <span>
          <button class="login" type="submit" @click.prevent="submit">
            注册
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
  name: 'RegisterPage',
  data() {
    return {
      usernameValue: '', // 用户名
      passwordValue: '', // 密码
      telValue: '', // 电话
      emailValue: '', // 邮箱
      passwordRepeatValue: '', // 重复密码
      genderValue: '', // 性别
      dateOfBirthValue: '', // 出生日期
      protraitValue: 'logo.png', // 头像
      personalizedSignatureValue: '' // 个性签名
    };
  },
  methods: {
    // 注册
    submit: throttle(function () {
      if (!window.localStorage || !window.sessionStorage) {
        alert('浏览器不支持 localStorage 或 sessionStorage，无法注册！');
      } else {
        if (this.usernameValue === '') {
          plugins.domShowTimeout(this.$refs.myHint, '账号不能为空哟！');
          return;
        } else if (this.passwordValue === '') {
          plugins.domShowTimeout(this.$refs.myHint, '密码不能为空哟！');
          return;
        } else if (this.usernameValue.length > 12) {
          plugins.domShowTimeout(this.$refs.myHint, '账号长度不能超过12位哟！');
          return;
        } else if (this.usernameValue.length < 5) {
          plugins.domShowTimeout(this.$refs.myHint, '账号长度不能小于6位哟！');
          return;
        } else if (this.passwordValue.length > 20) {
          plugins.domShowTimeout(this.$refs.myHint, '密码长度不能超过20位哟！');
          return;
        } else if (this.passwordValue.length < 3) {
          plugins.domShowTimeout(this.$refs.myHint, '密码长度不能小于3位哟！');
          return;
        } else if (!this.passwordValue.match(/^[A-Z]+/)) {
          plugins.domShowTimeout(this.$refs.myHint, '密码开头必须大写哟！');
          return;
        } else if (this.passwordValue !== this.passwordRepeatValue) {
          plugins.domShowTimeout(this.$refs.myHint, '两次密码需要一致哟！');
          return;
        } else if (!this.telValue.match(/^1[0-9]{10}$/)) {
          plugins.domShowTimeout(this.$refs.myHint, '输入的电话格式不对哟！');
          return;
        } else if (!this.emailValue.match(/^\w+@\w+\.[a-zA-z]{2,6}\b$/)) {
          plugins.domShowTimeout(this.$refs.myHint, '输入的邮箱格式不对哟！');
          return;
        }
        // 把注册信息存到 localStorage 里
        localStorage.setItem(
          this.usernameValue,
          JSON.stringify({
            password: this.passwordValue,
            tel: this.telValue,
            email: this.emailValue,
            gender: this.genderValue,
            dateOfBirth: this.dateOfBirthValue,
            protrait: this.protraitValue,
            personalizedSignature: this.personalizedSignatureValue
          })
        );
        // // 提示注册成功
        plugins.domShowTimeout(this.$refs.myHint, '注册成功！');
        // 注册成功后 一秒之后返回注册前页面
        setTimeout(() => {
          this.$router.push({ path: this.$route.query.previousPath });
        }, 500);
      }
    }, 500),

    // 返回
    cancel: throttle(function () {
      this.$router.go(-1);
    }, 500),
    // 密码可看或不能看
    changePasswordState1() {
      var a = this.$refs.myIconEye1.className.split(' ')[0];
      var b = '';
      if (this.$refs.myIconEye1.className.split(' ')[0] === 'icon-eye') {
        a = 'icon-eye-blocked ';
        b = a.concat(this.$refs.myIconEye1.className.split(' ')[1]);
        this.$refs.myIconEye1.className = b;
        this.$refs.myPassword.type = 'text';
      } else {
        a = 'icon-eye ';
        b = a.concat(this.$refs.myIconEye1.className.split(' ')[1]);
        this.$refs.myIconEye1.className = b;
        this.$refs.myPassword.type = 'password';
      }
    },
    // 重复密码可看或不能看
    changePasswordState2() {
      var a = this.$refs.myIconEye2.className.split(' ')[0];
      var b = '';
      if (this.$refs.myIconEye2.className.split(' ')[0] === 'icon-eye') {
        a = 'icon-eye-blocked ';
        b = a.concat(this.$refs.myIconEye2.className.split(' ')[1]);
        this.$refs.myIconEye2.className = b;
        this.$refs.myPasswordRepeat.type = 'text';
      } else {
        a = 'icon-eye ';
        b = a.concat(this.$refs.myIconEye2.className.split(' ')[1]);
        this.$refs.myIconEye2.className = b;
        this.$refs.myPasswordRepeat.type = 'password';
      }
    }
  }
};
</script>

<style lang='less' scoped>
.registerpage {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #16161a;
  .registerbox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    height: 480px;
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
      #password,
      #tel,
      #email,
      #protrait,
      #passwordRepeat {
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
      #passwordRepeat {
        margin-bottom: 16px;
      }
      .first-icon {
        position: absolute;
        top: 305px;
        right: 44px;
        cursor: pointer;
      }
      .second-icon {
        position: absolute;
        top: 372px;
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
