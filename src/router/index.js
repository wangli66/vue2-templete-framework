import Vue from 'vue';
import VueRouter from 'vue-router';
import scrollBehavior from './scrollBehavior.js';
import routes, { existComp } from './routes.js';

Vue.use(VueRouter);

const mode = 'hash';
const base = mode === 'hash' ? '/' : process.env.BASE_URL;
const router = new VueRouter({
    mode,
    base,
    scrollBehavior,
    routes
});

/**
 * 功能：路由拦截
 * 1、如果地址栏中的路由存在，就跳转到该路由中去
 * 2、如果路由不存在，但路由对应的组件存在，动态加载路由
 * 3、路由不存在，又无法动态加载，跳转至首页
 */
router.beforeEach((to, from, next) => {
    let curPath = to.path;
    let allRoutes = router.getRoutes();
    let isExist = allRoutes.filter(item => item.path == curPath || item.name == to.name);
    if (isExist && isExist.length > 0) {
        next();
    } else {
        let compObj = existComp(curPath, allRoutes);
        if (compObj.isExist) {
            router.addRoute(compObj.parentPath, compObj.routerConfig);
            next({ path: curPath });
        } else {
            next({ name: 'home' });
        }
    }
});

//修改原型对象上的push方法，避免跳转当前界面报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default router;
