<template>
  <div class="lefthotnews">
    <ul class="lefthotnews-ul">
      <li
        class="lefthotnews-ul-li"
        v-for="(item, index) in data"
        :key="item.id"
      >
        <!-- 头像和用户名 -->
        <header class="news-header">
          <div class="header-info">
            <a href="javascript:;" class="header-info-protrait">
              <img :src="item.headerProtrait" alt="网络错误，无法显示图片！" />
            </a>
            <div class="header-info-username">
              {{ item.headerUsername }}
            </div>
          </div>
          <div class="header-subscribe">
            <i class="icon-point-right"></i>关注
          </div>
        </header>
        <!-- 图片 -->
        <div class="news-body">
          <div class="news-body-p">{{ item.bodyP }}</div>
          <div class="news-body-pictures">
            <div class="row" v-for="item2 in item.bodyPictures" :key="item2.id">
              <div
                class="news-body-pictures-num"
                v-for="item3 in item2.row"
                :key="item3.id"
              >
                <img
                  :src="item3.imgPath"
                  alt="网络错误，无法显示图片！"
                  :data-flag="`${item3.imgFlag}`"
                  @click="scalePic($event)"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 三连区 -->
        <footer class="news-footer">
          <div class="sanlian">
            <!-- 点赞 -->
            <div
              class="like"
              :data-flag="`${item.like.likeFlag}`"
              @click.stop="getlike($event)"
            >
              <i class="icon-heart"></i><span>{{ item.like.likeNum }}</span>
            </div>
            <!-- 评论 -->
            <div
              class="comments"
              :data-flag="`${item.comments.commentsFlag}`"
              @click.capture="openCommentsList($event, item.id)"
            >
              <i class="icon-bubbles3"></i
              ><span>{{ item.comments.commentsNum }}</span>
            </div>
            <!-- 转发 -->
            <div
              class="transmit"
              :data-flag="`${item.transmit.transmitFlag}`"
              @click="transmit($event)"
            >
              <i class="icon-share2"></i
              ><span>{{ item.transmit.transmitNum }}</span>
              <div class="transmit-list">
                <div class="fast-transmit">快转</div>
                <div class="normal-transmit">转发</div>
              </div>
            </div>
          </div>
          <!-- 评论区 -->
          <div class="comments-list">
            <!-- 发评论 -->
            <div class="post-comments">
              <input
                type="text"
                name="post-comment"
                id="post-comment"
                placeholder="发布你的评论"
              />
              <button @click="postComments($event, item.id)">评论</button>
            </div>
            <!-- 评论列表 -->
            <ul>
              <li
                v-for="item4 in commentsDataList[index].commentsData"
                :key="item4.id"
              >
                <!-- 评论者的头像 -->
                <div class="comments-list-header">
                  <a href="javascript:;" class="comments-list-header-protrait">
                    <img
                      :src="item4.postUsernameProtrait"
                      alt="网络错误，无法显示图片！"
                    />
                  </a>
                </div>
                <div class="comments-list-body">
                  <!-- 评论者的用户名 -->
                  <a href="javascript:;" class="comments-list-body-username">{{
                    item4.postUsername
                  }}</a>
                  <!-- 评论者评论的内容 -->
                  <p class="comments-list-body-p">
                    {{ item4.commentsContent }}
                  </p>
                  <!-- 评论者评论的日期 -->
                  <span class="comments-list-body-date">{{
                    item4.postDate
                  }}</span>
                </div>
                <!-- 删除评论 -->
                <div class="comments-list-footer">
                  <span
                    @click="removeComments($event, item.id, item4.commentsId)"
                    >删除</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </footer>
      </li>
    </ul>
  </div>
</template>

<script>
import { plugins, getTime } from '@/api/plugins.js';
import { mapState } from 'vuex';

export default {
  name: 'LeftHotNews',
  data() {
    return {
      // rootPath: process.env.BASE_URL, // 根路径
      commentsId: 1,
      rememberScroll: 0 // 记录滚动条位置
    };
  },
  methods: {
    // 鼠标点击 放大图片
    scalePic(e) {
      plugins.scalePic(e);
    },
    // 点击点赞按钮
    getlike(e) {
      // 判断是否登陆
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        plugins.getlike(e);
      } else {
        this.$router.push({ path: '/LoginPage' });
      }
    },
    // 打开和关闭评论区
    openCommentsList(e, id) {
      plugins.openCommentsList(e, id);
    },
    // 发评论

    postComments(e, id) {
      // 判断是否登陆
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        var inputValue = e.target.previousSibling.value;
        if (inputValue === '') {
          return;
        } else {
          let ul = e.target.parentNode.nextSibling;
          let commentslength = ul.children.length; // 获取评论区的长度
          if (commentslength === 0) {
            this.commentsId = 1; // 如果评论区的数量为0时 则说明评论区没有评论了 id 重制为1
          }
          let usernameFromSession = Object.keys(
            JSON.parse(JSON.stringify(sessionStorage))
          )[0]; // 当前登陆的用户名
          let valueFromLocal = localStorage.getItem(usernameFromSession);
          let protraitFromLocal = JSON.parse(valueFromLocal).protrait; // 当前登陆用户名的头像
          let postDate = getTime();
          let postCommentsObj = {
            id: id, // 在哪一个 li 里评论的 id
            newCommentsData: {
              commentsId: this.commentsId++, // 评论的 id
              postUsernameProtrait: protraitFromLocal, // 评论者的头像
              postUsername: usernameFromSession, // 评论者的用户名
              commentsContent: inputValue, // 评论的值
              postDate: postDate
            }
          };
          // 把评论过来的数据存到vuex里
          this.$store.commit(
            'MAINMIDDLEHOTNEWS/getPostCommentsData',
            postCommentsObj
          );
          this.$nextTick(() => {
            // 发完评论 清空input值
            e.target.previousSibling.value = '';
          });
          e.target.parentNode.parentNode.previousSibling.childNodes[1].lastChild
            .textContent++; // 评论的数量+1
        }
      } else {
        this.$router.push({ path: '/LoginPage' });
      }
    },
    // 转发
    transmit(e) {
      plugins.transmit(e);
    },
    // 删除评论
    removeComments(e, id, commentsId) {
      // 判断是否登陆
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        // 获取是哪个li里的第几条评论删除了
        let ids = {
          id: id,
          commentsId: commentsId
        };
        this.$store.commit('MAINMIDDLEHOTNEWS/removeComments', ids);
        e.target.parentNode.parentNode.parentNode.parentNode.previousSibling
          .childNodes[1].childNodes[1].textContent--; // 评论总数-1
      } else {
        this.$router.push({ path: '/LoginPage' });
      }
    }
  },
  computed: {
    ...mapState({ data: (state) => state.MAINMIDDLEHOTNEWS.data }),
    ...mapState({
      commentsDataList: (state) => state.MAINMIDDLEHOTNEWS.commentsDataList
    })
  },
  created() {
    this.$store.dispatch('MAINMIDDLEHOTNEWS/getData');
    this.$store.commit('MAINMIDDLEHOTNEWS/initCommentsDataList');
  },
  activated() {
    window.scrollTo(0, this.rememberScroll);
  },
  beforeRouteLeave(to, from, next) {
    this.rememberScroll = window.scrollY;
    next();
  }
};
</script>

<style lang="less">
.lefthotnews-ul {
  .lefthotnews-ul-li {
    border: 1px solid #222;
    border-radius: 8px;
    background-color: #16161a;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    .news-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 25px;

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

        .header-info-username {
          padding-left: 10px;
          color: #eee;
        }
      }
      .header-subscribe {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 28px;
        font-size: 12px;
        border-radius: 15px;
        border: 1px solid #ff8200;
        color: #ff8200;
        cursor: pointer;

        .icon-point-right:before {
          content: '\ea04';
          margin-right: 4px;
        }
      }
    }

    .news-body {
      padding: 10px 10px 10px 70px;

      .news-body-p {
        margin: 0 10px 40px 0;
        color: #eee;
        font-size: 14px;
      }

      .news-body-pictures {
        display: flex;
        flex-direction: column;
        margin-right: 80px;

        .row {
          display: flex;
          width: 100%;
          height: 150px;

          &:nth-child(-n + 2) {
            margin-bottom: 8px;
          }

          .news-body-pictures-num {
            width: 150px;
            height: 150px;
            border: 1px solid #333;
            border-radius: 8px;

            &:nth-child(-n + 2) {
              margin-right: 6px;
            }
            img {
              position: relative;
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
        }
      }
    }

    .news-footer {
      padding: 15px 50px 5px;
      display: flex;
      flex-direction: column;
      .sanlian {
        position: relative;
        display: flex;
        justify-content: space-between;
        .like,
        .comments,
        .transmit {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover i,
          &:hover span {
            color: #ff8200;
            text-shadow: 0 0 15px #ff8200;
          }

          i,
          span {
            width: 18px;
            height: 16px;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #808080;
            padding: 6px;
            transition: all 0.1s;
          }

          i {
            font-size: 16px;
          }

          .icon-heart:before {
            content: '\e9da';
          }

          .icon-bubbles3:before {
            content: '\e96f';
          }

          .icon-share2:before {
            content: '\ea82';
          }
        }

        .transmit .transmit-list {
          position: absolute;
          bottom: 50px;
          right: 0;
          display: none;
          flex-direction: column;
          background-color: #16161a;
          border-radius: 8px;
          border: 1px solid #ea8011;
          &::after {
            position: absolute;
            bottom: -17px;
            right: 20px;
            content: '';
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-top-color: #ea8011;
          }
          .fast-transmit,
          .normal-transmit {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            width: 110px;
            height: 35px;
            color: #eee;
            padding: 8px 10px;
            &:hover {
              background-color: #333;
              border-radius: 8px;
            }
          }
        }
      }

      .comments-list {
        margin-top: 10px;
        display: none;
        .post-comments {
          display: flex;
          justify-content: space-between;
          border-radius: 8px;

          #post-comment {
            width: 82%;
            padding: 8px 12px;
            font-size: 15px;
            border-radius: 8px;
            border: 1px solid transparent;
            background-color: #25252c;
            color: #808080;
            &:focus {
              border: 1px solid #ea8011;
              background-color: #16161a;
            }
          }
          button {
            background-color: #ff8200;
            padding: 0 12px;
            border-radius: 50%;
            cursor: pointer;
          }
        }
        ul {
          margin-top: 10px;
          li {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            &:not(:last-child) {
              border-bottom: 1px solid #222;
            }
            .comments-list-header {
              a {
                display: inline-block;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .comments-list-body {
              width: 100%;
              margin: 0 10px;
              font-size: 12px;
              .comments-list-body-username {
                color: #ea8011;
              }
              .comments-list-body-p {
                color: #eee;
                padding: 8px 0;
              }
              .comments-list-body-date {
                color: #808080;
              }
            }
            .comments-list-footer {
              span {
                display: inline-block;
                width: 34px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                border-radius: 11px;
                font-size: 12px;
                background-color: #333;
                color: #808080;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>