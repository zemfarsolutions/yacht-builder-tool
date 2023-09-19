import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAnchor, faArrowRotateBackward, faUser, faArrowRotateForward, faDollar, faDroplet, faPerson, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSelectImage from 'vue-select-image';
import 'vue-select-image/dist/vue-select-image.css';
import router  from './router'; 

const app = createApp(App)
            .component("font-awesome-icon", FontAwesomeIcon);

library.add(faPhone);
library.add(faTrash);
library.add(faUser);
library.add(faPerson);
library.add(faAnchor);
library.add(faDroplet);
library.add(faDollar);
library.add(faArrowRotateForward);
library.add(faArrowRotateBackward);
app.use(createPinia())
app.use(VueSelectImage)
app.use(router)

app.mount('#app')
