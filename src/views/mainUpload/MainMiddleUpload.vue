<template>
  <div class="mainmiddleupload">
    <div class="upload">
      <div class="upload-header">
        <div class="upload-header-protrait">
          <img :src="protrait" alt="网络错误，无法显示图片！" />
        </div>
        <div class="upload-header-username">{{ username }}</div>
      </div>
      <div class="upload-body">
        <div class="upload-body-contents">
          <textarea
            name="uploadContents"
            id="upload-contents-area"
            placeholder="编辑你的微博吧！"
            v-model.trim.lazy="textareaValue"
            ref="myTextarea"
            @change="sendWeiboDataWhenTextareaChange"
          ></textarea>
        </div>
        <div class="upload-body-pics" ref="myUploadBodyPics">
          <div
            class="upload-body-pics-num"
            v-for="item in picsDataList"
            :key="item.imgId"
          >
            <div
              class="icon-arrow-left2"
              @click="moveLeft(item.imgId)"
              @mouseenter="arrowLeftMouseEnter($event)"
              @mouseleave="arrowLeftMouseLeave($event)"
            ></div>
            <div
              class="icon-arrow-right2"
              @click="moveRight(item.imgId)"
              @mouseenter="arrowRightMouseEnter($event)"
              @mouseleave="arrowRightMouseLeave($event)"
            ></div>
            <img
              :src="item.uploadImg"
              alt="网络错误，无法显示图片！"
              :data-flag="`${item.imgFlag}`"
              @click="scalePic($event)"
              @mouseenter="imgMouseEnter($event)"
              @mouseleave="imgMouseLeave($event)"
            />
            <input
              type="file"
              name="uploadPic"
              id="uploadPic"
              @change="uploadImgFile($event, item.imgId)"
            />
            <i
              class="icon-cross"
              ref="myIcon"
              @click="removeImgFile($event, item.imgId)"
              @mouseenter="crossMouseEnter($event)"
              @mouseleave="crossMouseLeave($event)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plugins } from '@/api/plugins.js';
import { eventBus } from '@/eventBus/eventBus.js';

export default {
  name: 'MainMiddleUpload',
  data() {
    return {
      username: '',
      protrait: '',
      textareaValue: '',
      picsDataList: [{ uploadImg: '', imgFlag: false, imgId: 1 }], // 存放图片信息的数组
      imgInitialId: 1, // 图片id初始值
      hasSaveFlag: true, // 判断页面信息是否需要保存
      hasContentChangeFlag: false // 判断页面信息是否被用户修改
    };
  },
  watch: {
    // 监听 textareaValue 是否被用户修改
    textareaValue() {
      this.hasContentChangeFlag = true;
    },
    picsDataList() {
      this.hasContentChangeFlag = true;
    }
  },
  methods: {
    // 划入 arrowLeft icon 时
    arrowLeftMouseEnter(e) {
      e.target.style.color = '#ff8200';
      e.target.nextSibling.nextSibling.style.border = '1px solid #ff8200';
    },
    // 划出 arrowLeft icon 时
    arrowLeftMouseLeave(e) {
      e.target.style.color = '';
      e.target.nextSibling.nextSibling.style.border = '';
    },
    // 划入 arrowRight icon 时
    arrowRightMouseEnter(e) {
      e.target.style.color = '#ff8200';
      e.target.nextSibling.style.border = '1px solid #ff8200';
    },
    // 划出 arrowRight icon 时
    arrowRightMouseLeave(e) {
      e.target.style.color = '';
      e.target.nextSibling.style.border = '';
    },
    // 划入图片时
    imgMouseEnter(e) {
      e.target.style.border = '1px solid #ff8200';
    },
    // 划出图片时
    imgMouseLeave(e) {
      e.target.style.border = '';
    },
    // 划入 cross icon 时
    crossMouseEnter(e) {
      e.target.style.color = '#ff8200';
      e.target.previousSibling.previousSibling.style.border =
        '1px solid #ff8200';
    },
    // 划出 cross icon 时
    crossMouseLeave(e) {
      e.target.style.color = '';
      e.target.previousSibling.previousSibling.style.border = '';
    },
    // 放大图片
    scalePic(e) {
      plugins.scalePic(e); // 插件
      e.target.style.display = 'block'; // 变小后显示图片 不让他隐藏
    },
    // 整合发送给 MainLeftUpload.vue 的微博信息
    getDataList() {
      let dataList = {
        textarea: this.textareaValue,
        picsDataList: this.picsDataList
      };
      eventBus.$emit('sendWeiboDataList', dataList);
    },
    // textarea 改变时 把微博信息发送给 MainLeftUpload.vue
    sendWeiboDataWhenTextareaChange() {
      this.getDataList();
    },
    // 上传图片文件
    uploadImgFile(e, id) {
      // 每次添加图片时 判断之前是否发布过微博并且都是没有图片的 如果是则重制id
      let tempArr = this.$store.state.MYWEIBO.weiboDataAll;
      if (tempArr[tempArr.length - 1].dataList.firstFlag !== true) {
        if (tempArr.every((item) => item.dataList.picsDataList.length === 0)) {
          this.imgInitialId = 1; // 重制 imgInitialId 为 1
        }
      }
      const imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (res) => {
        this.picsDataList.some((item) => {
          if (item.imgId === id) {
            item.uploadImg = res.target.result; // 获取到上传图片的base64格式链接
          }
        });

        e.target.style.display = 'none'; //上传图片文件隐藏
        e.target.previousSibling.style.display = 'block'; // 图片显示
        e.target.nextSibling.style.display = 'block'; // cross icon 显示
        e.target.previousSibling.previousSibling.style.display = 'block'; // arrowLeft icon 显示
        e.target.previousSibling.previousSibling.previousSibling.style.display =
          'block'; // arrowRight icon 显示
        let lengthOfPicsDataList = this.picsDataList.length; // 上传图片数量的总数
        // 如果添加的是最后一张照片 则已经到最多照片数量 所以 return
        if (lengthOfPicsDataList === 9) {
          // 添加图片时 把微博信息发送给 MainLeftUpload.vue
          this.getDataList();
          return;
        }
        let obj = {
          uploadImg: '',
          imgFlag: false,
          imgId: ++this.imgInitialId
        };
        this.picsDataList.push(obj); // 添加完一张照片后 准备添加后一张照片
        this.getDataList(); // 添加图片时 把微博信息发送给 MainLeftUpload.vue
      };
    },
    // 删除图片文件
    removeImgFile(e, id) {
      // 删除选中的那张照片
      this.picsDataList.some((item, index) => {
        if (item.imgId === id) {
          this.picsDataList.splice(index, 1);
        }
      });
      let lengthOfPicsDataList = this.picsDataList.length; // 上传图片数量的总数
      // 当删除删到length为一时
      if (lengthOfPicsDataList === 1) {
        // 每次删除最后一个图片后 判断之前是否发布过微博并且都是没有图片的 如果是则重制id
        let tempArr = this.$store.state.MYWEIBO.weiboDataAll;
        if (tempArr[tempArr.length - 1].dataList.firstFlag !== true) {
          if (
            tempArr.every((item) => item.dataList.picsDataList.length === 0)
          ) {
            this.imgInitialId = 1; // 重制 imgInitialId 为 1
            this.$set(this.picsDataList[0], 'imgId', 1); // 重制第一个 imgId 为 1
          }
        }
        e.target.previousSibling.style.display = 'block'; // input：file显示
        e.target.previousSibling.previousSibling.style.display = 'none'; // 图片隐藏
        e.target.style.display = 'none'; // cross icon 隐藏
        e.target.previousSibling.previousSibling.previousSibling.style.display =
          'none'; // arrowLeft icon 隐藏
        e.target.previousSibling.previousSibling.previousSibling.previousSibling.style.display =
          'none'; // arrowRight icon 隐藏
      }
      if (
        // 删除后 如果图片还剩下八张 并且 最后一张图片的值不为空时
        lengthOfPicsDataList === 8 &&
        this.picsDataList[this.picsDataList.length - 1].uploadImg !== ''
      ) {
        let obj = {
          uploadImg: '',
          imgFlag: false,
          imgId: ++this.imgInitialId
        };
        this.picsDataList.push(obj); // 添加一个input：file 用来添加图片文件
      }
      this.getDataList(); // 删除图片时 把微博信息发送给 MainLeftUpload.vue
    },
    // 图片向左移动
    moveLeft(id) {
      this.picsDataList.some((item, index) => {
        if (item.imgId === id) {
          if (index === 0) {
            return; // 如果图片位置在第一个 则无法再向左移动
          } else {
            this.picsDataList.splice(index, 1); // 删除这个图片
            this.picsDataList.splice(index - 1, 0, item); // 把它添加到上一个图片前
            this.getDataList(); // 左移图片时 把微博信息发送给 MainLeftUpload.vue
          }
        }
      });
    },
    // 图片向右移动
    moveRight(id) {
      this.picsDataList.some((item, index) => {
        if (item.imgId === id) {
          if (index === 8) {
            return;
          } else {
            if (this.picsDataList[index + 1].uploadImg === '') {
              return;
            } else {
              /* 
                唯一有效方法，使用和向左移一样的方法splice会有奇怪不知名的bug，
                例如删除这个item图片后（this.picsDataList.splice(index, 1)），
                再在item后一个元素后面添加时（ this.picsDataList.splice(index - 1, 0, item)），
                不会添加在其后面，反而是添加到了array的最后 与最后一个元素交换了位置，
                代码逻辑完全正确，测试简单相关splice小demo后 splice方法完全可行，
                但到了vue里，就出现了上述bug，目前只有用如下方法可解决。
                如下方法为：利用创建新数组，不断push进去 实现深拷贝。
                其余深拷贝法，例如使用，结构方式展开运算符 {...arr} 无法实现。
               */
              let a = this.picsDataList.splice(0, index); // 删除这个item之前的
              let b = this.picsDataList.splice(0, 1); // 删除这个item
              let c = this.picsDataList.splice(0, 1); // 删除这个item的后一个
              let d = this.picsDataList.splice(0, this.picsDataList.length - 1); // 删除后一个到倒数第二个
              let e = this.picsDataList.splice(-1); // 最后一个空item
              let arr = []; // 创建一个新数组 把上面push进去
              arr.push(...a);
              arr.push(...c);
              arr.push(...b);
              arr.push(...d);
              arr.push(...e);
              this.picsDataList = arr; // 再赋值给原来数组
              this.getDataList(); // 右移图片时 把微博信息发送给 MainLeftUpload.vue
            }
          }
        }
      });
    }
  },

  created() {
    // from MainLeftUpload.vue 当点击发布微博是 要清除页面信息
    eventBus.$off('getPostFlag');
    eventBus.$on('getPostFlag', (value) => {
      this.hasSaveFlag = value;
    });
  },

  activated() {
    /* 
      每次发布微博后需要清除信息和每次不保存页面清除信息后，需要将 hasContentChangeFlag 的值改为false。
      因为每次在清除页面时，这些数据都会被watch所监听到，监听信息是否改变，而这个监听是在路由跳转完毕后才会监听到的。
      我们不能在路由跳转之后去把 hasContentChangeFlag 的值回调，这个过程在监听的前面。
      所以我们必须在每次重新激活这个页面的时候，再去把 hasContentChangeFlag 的值改为 false。
    */
    this.hasContentChangeFlag = false;
    // 每次router激活时时 把微博信息发送给 MainLeftUpload.vue
    this.getDataList();
    // 自动 focus textarea
    this.$refs.myTextarea.focus();
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
  beforeRouteLeave(to, from, next) {
    // 在离开路由前 判断用户是用什么方式离开页面的 判断用户是否点击了发布微博的按钮 如果为false 则清除页面信息 然后放行
    if (this.hasSaveFlag === false) {
      this.textareaValue = '';
      this.picsDataList.splice(0, this.picsDataList.length - 1);
      this.hasSaveFlag = true;
      next();
    } else {
      // 如果用户没有点击发布微博按钮 则判断用户是否修改了页面的信息 如果为false 说明没有改动 之间放行
      if (this.hasContentChangeFlag === false) {
        next();
      } else {
        // 如果用户修改了页面 则在路由跳转前 提醒用户 是否需要保存刚刚的修改
        let a = confirm('是否要保存草稿?');
        if (a) {
          next(); // 点击是 放行
        } else {
          this.textareaValue = '';
          this.picsDataList.splice(0, this.picsDataList.length - 1);
          next(); // 点击否 清楚页面信息 然后放行
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #222;
  border-radius: 8px;
  background-color: #16161a;
  .upload-header {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    .upload-header-protrait {
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
    .upload-header-username {
      padding-left: 10px;
    }
  }
  .upload-body {
    display: flex;
    flex-direction: column;
    padding: 10px 20px 60px 70px;
    .upload-body-contents {
      textarea {
        width: 100%;
        height: 100px;
        resize: none;
        margin: 0;
        background-color: #16161a;
        color: #ff8200; // 光标的颜色
        text-shadow: 0px 0px 0px #eee; // 文本颜色
        -webkit-text-fill-color: transparent; // 把原本的文字颜色设置为透明
      }
    }
    .upload-body-pics {
      display: flex;
      flex-wrap: wrap;
      .upload-body-pics-num {
        position: relative;
        width: 150px;
        height: 150px;
        border-radius: 8px;
        &:not(:nth-child(3n)) {
          margin-right: 6px;
        }
        &:nth-child(n) {
          margin-bottom: 50px;
        }
        .icon-arrow-left2,
        .icon-arrow-right2 {
          position: absolute;
          bottom: -30px;
          display: none;
          cursor: pointer;
        }
        .icon-arrow-left2 {
          left: 35px;
        }
        .icon-arrow-right2 {
          right: 35px;
        }
        .icon-arrow-left2:before {
          content: '\ea40';
        }
        .icon-arrow-right2:before {
          content: '\ea3c';
        }
        img {
          position: relative;
          display: none;
          width: 100%;
          height: 100%;
          cursor: pointer;
          border: 1px solid #333;
          border-radius: 8px;
        }
        #uploadPic {
          // display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          border: 1px solid #333;
          color: #000;
          background: url('../../assets/images/addImgFile.webp') center/100%
            no-repeat;
          &:hover {
            border: 1px solid #ff8200;
          }
        }
        i {
          position: absolute;
          top: 160px;
          left: 70px;
          display: none;
          line-height: 25px;
          text-align: center;
          font-size: 12px;
          border-radius: 50%;
          cursor: pointer;
        }

        .icon-cross:before {
          content: '\ea0f';
        }
      }
    }
  }
}
</style>