import Vue from 'vue'
import App from './App.vue'
import router from './router'

// axios --start
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// axios --end

// 引入初始化 css 样式
import './css/normalize.css'

// 引入所有组件和 css 代码 --start
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
// 引入所有组件和 css 代码 --end

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
