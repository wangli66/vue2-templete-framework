import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// 引入封装的http
import './utils/http/index.js';

// 引入工具类和共用样式
import './utils/index.js';
import './common.less';

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入项目写的组件
import globalComp from './components/index.js';
globalComp(Vue);

/**
 * 在路由守卫中校验登录状态
 * 在实际发开中一般是发送一个请求进行登录或登录状态的校验
 */
// import { MessageBox } from 'element-ui';
// router.beforeResolve((to, from, next) => {
//     let isLogin = store.state.user.isLogin;
//     if (!isLogin) {
//         MessageBox.confirm('尚无用户登录，请求是否跳转登录界面', '提示', {
//             confirmButtonText: '确定',
//             cancelButtonText: '取消',
//             type: 'warning'
//         })
//             .then(() => {
//                 store.commit('user/setLoginSate', true);
//                 next({ path: '/login' });
//             })
//             .catch(() => {
//                 next();
//             });
//     } else {
//         next();
//     }
// });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
