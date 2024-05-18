// todomvc css
import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router);

app.directive('focus', {
    mounted(el) {
        el.focus();
    }
});

app.mount('#app');
