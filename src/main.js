import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAnchor, faArrowAltCircleLeft, faArrowCircleLeft, faArrowRotateBackward, faArrowRotateForward, faDollar, faDroplet, faPerson, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSelectImage from 'vue-select-image'
// add stylesheet
import 'vue-select-image/dist/vue-select-image.css'

const app = createApp(App)
            .component("font-awesome-icon", FontAwesomeIcon);

library.add(faPhone);
library.add(faPerson);
library.add(faAnchor);
library.add(faDroplet);
library.add(faDollar);
library.add(faTrash);
library.add(faArrowRotateForward);
library.add(faArrowRotateBackward);
app.use(createPinia())
app.use(VueSelectImage)

app.mount('#app')
