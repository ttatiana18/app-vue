import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueAxios from "vue-axios";
import axios from "axios";

createApp(App).use(VueAxios, axios, VueSweetalert2).mount('#app')