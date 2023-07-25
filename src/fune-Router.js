import { createRouter, createWebHistory } from "vue-router";
import Review from "./views/Review.vue";
import Message from "./views/Message.vue";
import WebGL from "./views/CustomizedP.vue";
import Cart from "./views/Cart.vue";

//http://localhost:12345/ =>Home.vue
//http://localhost:12345/about =>About.vue
const routes = [
  {
    path: "/", //路徑
    component: Review, //對應要載入的元件
  },
  {
    path: "/message",
    component: Message,
  },
  {
    path: "/WebGL2",
    component: WebGL,
  },
  {
    path: "/Cart",
    component: Cart,
  },
];

//把歷史紀錄與設定檔都存到"router"裡面
const router = createRouter({
  history: createWebHistory(), //儲存成歷史紀錄
  routes, //設定檔
});

export default router; //匯出router
