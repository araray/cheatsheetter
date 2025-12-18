// src/main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/themes/default.css";
import "./assets/themes/dark.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
