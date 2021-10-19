import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';
import store from './store/index'
import { VueChatEmoji } from 'vue-chat-emoji';
import "vue-chat-emoji/dist/vue-chat-emoji.min.css"
// // console.log(Vue.prototype.$accessToken)
import { EmojiPickerPlugin } from 'vue-emoji-picker'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueChatEmoji);
Vue.use(EmojiPickerPlugin)
Vue.use(VueLoaders);
new Vue({
  render: h => h(App),
  router:router,
  store:store,
}).$mount('#app')
