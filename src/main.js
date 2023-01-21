import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import Toaster from "@meforma/vue-toaster";
import VueSocialSharing from 'vue-social-sharing'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSocialSharing);
app.use(Toaster, {position: 'top-right'})
app.mount('#app')
