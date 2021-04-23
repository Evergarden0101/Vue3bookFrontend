import { createApp } from "vue";
import App from "./App.vue";
import "es6-promise/auto";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Video from 'video.js'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

axios.defaults.baseURL='/api'
// Vue.prototype.$axios  = Axios
// app.config.globalProperties.$axios = axios
store.commit('setUserInfo', {token:'1',usertype:"teacher"})
createApp(App)
  .use(ElementPlus, { locale })
  .use(store)
  .use(router)
  .use(VideoPlayer)
  .use(VueAxios, axios)
  .mount("#app");
