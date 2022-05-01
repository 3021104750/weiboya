import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // 默认路径
  {
    path: '/',
    redirect: '/Hot'
  },
  // /Hot
  {
    path: '/Hot',
    name: 'Hot',
    redirect: '/Hot/LeftHotNews',
    components: {
      Hot: () => import('@/views/Hot.vue'),
      MainLeftHot: () => import('@/views/MainLeftHot.vue'),
    },
    children: [
      {
        path: 'LeftHotNews',
        name: 'LeftHotNews',
        components: {
          LeftHotNews: () => import('@/views/mainLeftHots/LeftHotNews.vue')
        },
      },
      {
        path: 'LeftWenyu',
        name: 'LeftWenyu',
        components: {
          LeftWenyu: () => import('@/views/mainLeftHots/LeftWenyu.vue')
        },
      },
      {
        path: 'LeftYaowen',
        name: 'LeftYaowen',
        components: {
          LeftYaowen: () => import('@/views/mainLeftHots/LeftYaowen.vue')
        }
      },
      {
        path: 'LeftHuati',
        name: 'LeftHuati',
        components: {
          LeftHuati: () => import('@/views/mainLeftHots/LeftHuati.vue')
        }
      },
      {
        path: 'LeftLocal',
        name: 'LeftLocal',
        components: {
          LeftLocal: () => import('@/views/mainLeftHots/LeftLocal.vue')
        }
      }
    ]
  },

  // /Home
  {
    path: '/Home',
    name: 'Home',
    // redirect: '/Home/LeftMyWeibo',
    components: {
      Home: () => import('@/views/Home.vue'),
      MainLeftHome: () => import('@/views/MainLeftHome.vue')
    },
    beforeEnter: (to, from, next) => {
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        next();
      } else {
        next({ path: '/LoginPage' });
      }
    },
    children: [
      {
        path: 'LeftMyWeibo',
        name: 'LeftMyWeibo',
        components: {
          LeftMyWeibo: () => import('@/views/mainLeftHomes/LeftMyWeibo.vue')
        }
      },
      {
        path: 'LeftMyPic',
        name: 'LeftMyPic',
        components: {
          LeftMyPic: () => import('@/views/mainLeftHomes/LeftMyPic.vue')
        },
      }
    ]
  },

  // /Upload
  {
    path: '/MainMiddleUpload',
    name: 'MainMiddleUpload',
    components: {
      MainMiddleUpload: () => import('@/views/mainUpload/MainMiddleUpload.vue'),
      MainLeftUpload: () => import('@/views/mainUpload/MainLeftUpload.vue')
    },
    beforeEnter: (to, from, next) => {
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        next();
      } else {
        next({ path: '/LoginPage' });
      }
    },
  },

  // /LoginPage
  {
    path: '/LoginPage',
    name: 'LoginPage',
    components: {
      LoginPage: () => import('@/views/login/LoginPage.vue')
    },
    beforeEnter: (to, from, next) => {
      to.query.previousPath = from.path;
      next();
    }
  },

  // /RegisterPage
  {
    path: '/RegisterPage',
    name: 'RegisterPage',
    components: {
      RegisterPage: () => import('@/views/login/RegisterPage.vue')
    },
    beforeEnter: (to, from, next) => {
      to.query.previousPath = from.path;
      next();
    }
  },

  // /PersonalCenter
  {
    path: '/PersonalCenter',
    name: 'PersonalCenter',
    components: {
      PersonalCenter: () => import('@/views/sliderUserBar/PersonalCenter.vue')
    },
    beforeEnter: (to, from, next) => {
      let obj = JSON.stringify(sessionStorage);
      if (obj !== '{}') {
        // to.query.previousPath = from.path;
        next();
      } else {
        next({ path: '/LoginPage' });
      }
    },
  },

  // /Setting
  {
    path: '/Setting',
    name: 'Setting',
    components: {
      Setting: () => import('@/views/sliderUserBar/Setting.vue')
    }
  }
];


const router = new VueRouter({
  mode: 'hash',
  base: 'weiboya',
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   // keep-alive 返回缓存页面后记录浏览位置
  //   if (savedPosition && to.meta.keepAlive) {
  //     return savedPosition;
  //   }
  //   // 异步滚动操作
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ x: 0, y: 0 });
  //     }, 0);
  //   });
  // }
});

export default router;

router.beforeEach((to, from, next) => {
  // 当进入到这些页面时，禁止页面滚动
  if (to.path === '/PersonalCenter' || to.path === '/Setting' || to.path === '/LoginPage' || to.path === '/RegisterPage') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
  next();
});