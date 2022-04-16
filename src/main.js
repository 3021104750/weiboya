import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import 'normalize.css';
import './assets/css/iconfont.css';
import './assets/css/initCss.css';

Vue.config.productionTip = false;

Vue.use(VueLazyload, {
  loading: require('./assets/images/black.webp')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
