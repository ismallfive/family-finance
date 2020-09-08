import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/reset.css';
import Vant from 'vant';
import 'vant/lib/index.less';
import './assets/style/custom.less';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from "qs";
import urlEncode from './api/urlEncode';

axios.defaults.baseURL = 'http://192.168.0.105:9527/api';

Vue.use(Vant);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.prototype.axiosConfig = function (method, url, data) {
  if (method === 'post') {
    return {
      method: method,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: url,
    };
  } else if (method === 'get') {
    return {
      method: method,
      url: url + "?" + urlEncode(data)
    };
  } else {
    return null;
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
