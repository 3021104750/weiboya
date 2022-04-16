<template>
  <div class="personalcenter">
    <div class="personalcenter-box">
      <!-- 表单 -->
      <form action="">
        <h3>个人中心</h3>
        <!-- 账号 -->
        <label for="username">账号：</label
        ><input
          type="text"
          name="username"
          id="username"
          v-model.trim.lazy="usernameValue"
          placeholder="请输入账号"
        />
        <div class="form-list">
          <!-- 表单左半边 -->
          <div class="form-left">
            <!-- 电话 -->
            <label for="tel">电话：</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              placeholder="请输入电话"
              v-model.trim.lazy="telValue"
            />
            <!-- 邮箱 -->
            <label for="email">邮箱：</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="请输入邮箱"
              v-model.trim.lazy="emailValue"
            />
            <!-- 密码 -->
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
            <!-- 重复密码 -->
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
          </div>
          <!-- 表单右半边 -->
          <div class="form-right">
            <!-- 性别label -->
            <div class="gender-label">
              <label for="man">男：</label>
              <label for="woman">女：</label>
            </div>
            <!-- 性别 -->
            <div class="gender">
              <input
                type="radio"
                name="gender"
                id="man"
                value="男"
                v-model.trim.lazy="genderValue"
              />
              <input
                type="radio"
                name="gender"
                id="woman"
                value="女"
                v-model.trim.lazy="genderValue"
              />
            </div>
            <!-- 出生日期 -->
            <label for="dateOfBirth">出生日期：</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              v-model.trim.lazy="dateOfBirthValue"
            />
            <!-- 个性签名 -->
            <label for="personalizedSignature">个性签名：</label>
            <input
              type="text"
              name="personalizedSignature"
              id="personalizedSignature"
              placeholder="请输入个性签名"
              v-model.trim.lazy="personalizedSignatureValue"
            />
            <!-- 头像 -->
            <label for="protrait">头像：</label>
            <input
              type="file"
              name="protrait"
              id="protrait"
              accept="image/*"
              @change="uploadFile"
              ref="myImgFile"
            />
          </div>
        </div>
        <!-- 保存 和 返回 -->
        <span>
          <button class="login" type="submit" @click.prevent="submit">
            保存
          </button>
          <button class="cancel" @click.prevent="cancel">返回</button>
        </span>
      </form>
      <div class="hint" ref="myHint"></div>
      <div class="previewProtrait">
        <div v-lazy-container="{ selector: 'img' }">
          <img :data-src="protraitValue" alt="网络错误，无法显示图片！" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plugins, throttle } from '@/api/plugins.js';

export default {
  name: 'PersonalCenter',
  data() {
    return {
      rootPath: process.env.BASE_URL,
      usernameValue: '', // 用户名
      passwordValue: '', // 密码
      telValue: '', // 电话
      emailValue: '', // 邮箱
      passwordRepeatValue: '', // 重复密码
      genderValue: '', // 性别
      dateOfBirthValue: '', // 出生日期
      protraitValue: '', // 头像路径
      personalizedSignatureValue: '' // 个性签名
    };
  },
  methods: {
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
    },
    // 提交头像文件 转为 base64 格式
    uploadFile() {
      let imgFile = this.$refs.myImgFile.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (res) => {
        this.protraitValue = res.target.result;
      };
    },
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
        } else if (!this.personalizedSignatureValue.length > 50) {
          plugins.domShowTimeout(
            this.$refs.myHint,
            '个性签名长度不能超过50位哟'
          );
        }

        // 把修改的信息存到 localStorage 里
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
        // // 提示修改信息成功
        plugins.domShowTimeout(this.$refs.myHint, '更改信息保存成功！');
      }
    }, 500),
    cancel: throttle(function () {
      this.$router.go(-1);
    }, 500)
  },
  mounted() {
    var usernameFromSession = Object.keys(
      JSON.parse(JSON.stringify(sessionStorage))
    )[0]; // 获取sessionStorage里登陆的用户名
    var valuesFromLocal = localStorage.getItem(usernameFromSession); //获取localStorage里用户的值
    this.usernameValue = usernameFromSession; // 用户名
    this.passwordValue = JSON.parse(valuesFromLocal).password; // 密码
    this.passwordRepeatValue = JSON.parse(valuesFromLocal).password; // 重复密码
    this.telValue = JSON.parse(valuesFromLocal).tel; // 电话
    this.emailValue = JSON.parse(valuesFromLocal).email; // 邮箱
    this.genderValue = JSON.parse(valuesFromLocal).gender; // 性别
    this.dateOfBirthValue = JSON.parse(valuesFromLocal).dateOfBirth; // 出生日期
    this.protraitValue = JSON.parse(valuesFromLocal).protrait; // 头像
    this.personalizedSignatureValue =
      JSON.parse(valuesFromLocal).personalizedSignature; // 个性签名
  }
};
</script>

<style lang='less' scoped>
.personalcenter {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #16161a;
  .personalcenter-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    width: 800px;
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
      .form-list {
        display: flex;
        justify-content: center;
        align-items: center;
        .form-left,
        .form-right {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .form-left {
          margin-right: 20px;
        }
      }
      #username,
      #password,
      #tel,
      #email,
      #protrait,
      #passwordRepeat,
      .gender,
      #dateOfBirth,
      #personalizedSignature,
      #protrait {
        width: 300px;
        height: 30px;
        line-height: 30px;
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
      .gender {
        #man {
          margin: 0 18px 0 118px;
        }
      }
      #passwordRepeat,
      #protrait {
        margin-bottom: 16px;
      }
      .first-icon {
        position: absolute;
        top: 305px;
        left: 360px;
        cursor: pointer;
      }
      .second-icon {
        position: absolute;
        top: 372px;
        left: 360px;
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
      margin: 30px 0 0 270px;
    }

    .previewProtrait {
      position: absolute;
      top: 300px;
      right: -210px;
      width: 150px;
      height: 150px;
      border: 1px solid #333;
      border-radius: 50%;
      &::before {
        position: absolute;
        top: 75px;
        left: -30px;
        display: block;
        content: '';
        width: 10px;
        height: 10px;
        border: 1px solid transparent;
        border-top-color: #ff8200;
        border-right-color: #ff8200;
        transform: rotate(45deg);
        box-shadow: inset -1px 1px 3px 0px #ff8200;
      }
      &::after {
        position: absolute;
        top: 78px;
        left: -40px;
        display: block;
        content: '';
        width: 10px;
        height: 4px;
        border: 1px solid transparent;
        border-top-color: #ff8200;
        border-bottom-color: #ff8200;
        box-shadow: -3px 0 7px 0px #ff8200;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
