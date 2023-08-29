import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueSelectImage from 'vue-select-image'
// add stylesheet
import 'vue-select-image/dist/vue-select-image.css'

const app = createApp(App)

app.use(createPinia())
app.use(VueSelectImage)

app.mount('#app')
