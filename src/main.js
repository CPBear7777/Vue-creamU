import { createApp } from "vue";
import App from "./App.vue";

import router from "./fune-Router.js"; //引用路徑，才能切換頁面

// Vuetify應該跟這無關
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");
