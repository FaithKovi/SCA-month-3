import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//Import VueHead for SEO purposes
import VueHead from 'vue-head'
//Import SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//Configure SweetAlert
const options = {
  confirmButtonColor: '#2c2c2c',
  cancelButtonColor: '#f000',
};
Vue.use(VueSweetalert2, options);
Vue.use(VueHead)
import {
  sync
} from 'vuex-router-sync'
sync(store, router);
import './assets/global.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')