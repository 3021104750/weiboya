import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createVuexAlong from 'vuex-along';

Vue.use(Vuex);

// MainRight.vue
const MAINRIGHT = {
  namespaced: true,
  state: {
    // 热搜显示内容
    data: [],
    // json数据总长度
    resultLength: 0,
    // 计算在第几个 json数组
    dataCount: 0
  },

  mutations: {
    // 初始化 右边栏热搜内容
    initData(state, value) {
      state.data = value;
    },
    // 初始化 右边栏热搜内容length
    initDataLength(state, value) {
      state.resultLength = value;
    },
    // 点击刷新 右边栏热搜内容
    refreshData(state, valueFromComponent) {
      state.dataCount = valueFromComponent;
      if (state.dataCount === state.resultLength - 1) {
        state.dataCount = 0;
      } else {
        state.dataCount++;
      }
    },
  },

  actions: {
    // 获取右边栏热搜 json数据
    getData(context) {
      axios.get('/data/mainRight/mainRightData.json').then(value => {
        context.commit("initData", value.data[context.state.dataCount]);
      });
    },
    // 获取右边栏热搜 json数据长度
    getDataLength(context) {
      axios.get('/data/mainRight/mainRightData.json').then(value => {
        context.commit("initDataLength", value.data.length);
      });
    }
  },
};

// LeftHotNews.vue
const MAINMIDDLEHOTNEWS = {
  namespaced: true,
  state: {
    data: [], // json 数据
    commentsDataList: [] // 评论
  },

  mutations: {
    // 把获取过来的json数据复制10份 放到一个新数组里
    initData(state, value) {
      var arr = [];
      var obj = value[0];
      for (var i = 0; i < 10; i++) {
        var { ...deepObj } = obj; // deepcopy 下数据
        obj.id++; // 使其里面的id 一次加一
        arr.push(deepObj);
      }
      state.data = arr;
    },
    // 初始化每个评论的值 并把它放到一个数组里
    initCommentsDataList(state) {
      var arr = [];
      var obj = {
        id: 1,
        commentsData: []
      };
      for (var i = 0; i < 10; i++) {
        var { ...deepObj } = obj; // deepcopy 下数据
        obj.id++; // 使其里面的id 一次加一
        arr.push(deepObj);
      }
      state.commentsDataList = arr;
    },
    // 获取最新评论 存到 commentsDataList 中
    getPostCommentsData(state, value) {
      let id = value.id; //   获取在哪一个 li 里评论的 id
      let newCommentsData = value.newCommentsData; // 获取评论的 id 和 内容
      state.commentsDataList.some(item => {
        if (item.id === id) { // 如果评论数据里的id和发表当前评论的id相同的话 push进数组 保存下来
          var [...arr] = item.commentsData; // deepcopy 下 使每个数组的都能独立 不能互相影响
          arr.unshift(newCommentsData); // 每次添加新评论 添加到评论区的开头
          item.commentsData = arr;
        }
      });
    },
    // 点击删除的评论
    removeComments(state, value) {
      state.commentsDataList.some(item => {
        // 获取是哪个 li 里 评论的 id
        if (item.id === value.id) {
          item.commentsData.some(contents => {
            // 删除的是第几条评论
            if (contents.commentsId === value.commentsId) {
              // 找到删除评论的那条在第几个位置 splice 掉它
              item.commentsData.splice(item.commentsData.indexOf(contents), 1);
            }
          });
        }
      });
    }
  },

  actions: {
    getData(context) {
      axios.get('/data/mainMiddleHot/hotNewsData.json').then(value => {
        context.commit('initData', value.data);
      });
    }
  }
};

// LeftWenyu.vue
const MAINMIDDLEWENYU = {
  namespaced: true,
  state: {
    data: [],
    commentsDataList: [] // 评论
  },

  mutations: {
    initData(state, value) {
      var arr = [];
      var obj = value[0];
      for (var i = 0; i < 10; i++) {
        var { ...deepObj } = obj; // deepcopy 下数据
        obj.id++; // 使其里面的id 一次加一
        arr.push(deepObj);
      }
      state.data = arr;
    },
    // 初始化每个评论的值 并把它放到一个数组里
    initCommentsDataList(state) {
      var arr = [];
      var obj = {
        id: 1,
        commentsData: []
      };
      for (var i = 0; i < 10; i++) {
        var { ...deepObj } = obj; // deepcopy 下数据
        obj.id++; // 使其里面的id 一次加一
        arr.push(deepObj);
      }
      state.commentsDataList = arr;
    },
    // 获取最新评论 存到 commentsDataList 中
    getPostCommentsData(state, value) {
      let id = value.id; //   获取在哪一个 li 里评论的 id
      let newCommentsData = value.newCommentsData; // 获取评论的 id 和 内容
      state.commentsDataList.some(item => {
        if (item.id === id) { // 如果评论数据里的id和发表当前评论的id相同的话 push进数组 保存下来
          var [...arr] = item.commentsData; // deepcopy 下 使每个数组的都能独立 不能互相影响
          arr.unshift(newCommentsData);
          item.commentsData = arr;
        }
      });
    },
    // 点击删除的评论
    removeComments(state, value) {
      state.commentsDataList.some(item => {
        // 获取是哪个 li 里 评论的 id
        if (item.id === value.id) {
          item.commentsData.some(contents => {
            // 删除的是第几条评论
            if (contents.commentsId === value.commentsId) {
              // 找到删除评论的那条在第几个位置 splice 掉它
              item.commentsData.splice(item.commentsData.indexOf(contents), 1);
            }
          });
        }
      });
    }
  },

  actions: {
    getData(context) {
      axios.get('/data/mainMiddleHot/wenyuData.json').then(value => {
        context.commit('initData', value.data);
      });
    }
  }
};

// postWeibo 发布微博
const MYWEIBO = {
  namespaced: true,
  state: {
    weiboId: 1,
    dataList: {},
    weiboDataAll: [{ removeButtonShowFlag: false, dataList: { textarea: '还没有发布一条微博哦，快去发布吧！', firstFlag: true } }],
    myWeiboPics: [], // 微博图片
  },
  mutations: {
    // 点击了发布微博按钮后 获取发布的信息 from MainLeftUpload.vue
    getWeiboDataList(state, value) {
      // 发布微博的时候查看一下是不是第一次发微博
      if (state.weiboDataAll[state.weiboDataAll.length - 1].dataList.firstFlag === true) {
        state.weiboDataAll.pop(); // 是的话删除第一条提示的微博 (还没有发布一条微博哦，快去发布吧！)
      }
      state.dataList = value;
      state.dataList.weiboId = state.weiboId++; // 给每一个微博附上id
      // state.dataList.imgFlag = false // 用来判断微博里发布的图片是否放大
      let obj = {
        removeButtonShowFlag: true, // 是否显示删除按钮
        dataList: state.dataList // 微博的信息 （textarea 和 picsDataList）
      };
      state.weiboDataAll.unshift(obj); // 每次发布的微博放到总共微博的第一条
    },
    // 删除微博 from LeftMyWeibo.vue
    removeWeibo(state, value) {
      // 删除对应的微博
      state.weiboDataAll.some((item, index) => {
        if (item.dataList.weiboId === value) {
          state.weiboDataAll.splice(index, 1);
        }
      });
      // 判断是否删除了最后一个微博 是的话 添加一个提示到weiboDataAll里 (还没有发布一条微博哦，快去发布吧！)
      if (state.weiboDataAll.length === 0) {
        let obj = {
          removeButtonShowFlag: false, dataList: { textarea: '还没有发布一条微博哦，快去发布吧！', firstFlag: true }
        };
        state.weiboDataAll.push(obj);
        state.weiboId = 1;
      }

    }
  }
};
export default new Vuex.Store({
  plugins: [createVuexAlong()],
  modules: {
    MAINRIGHT,
    MAINMIDDLEHOTNEWS,
    MAINMIDDLEWENYU,
    MYWEIBO
  }
});
