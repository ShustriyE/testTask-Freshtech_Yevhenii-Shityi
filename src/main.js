import Vue from 'vue'
import VueI18n from 'vue-i18n';
import App from './App.vue'
import store from './store/store'
import translates from './translates_i18n'
import 'normalize.css'

Vue.config.productionTip = false
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: translates,
});

new Vue({
  render: h => h(App),
  store,
  i18n,
}).$mount('#app')
