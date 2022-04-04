import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

// I dont know why i cant chain in using use(VueChartKick) before using router, online say can 
createApp(App).use(router).use(VueChartkick).use(VuesticPlugin).mount('#app')
