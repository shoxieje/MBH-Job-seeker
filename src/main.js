import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "./assets/styles/styles.sass";
import "./assets/styles/custom-variables.sass";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
