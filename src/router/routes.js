import { routerData, routerConfig } from './routerConfig.js';
import HomeView from '@/views/HomeView.vue';

/**
 * 路由的配置，如果是静态路由，可以在此配置完整
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '首页'
        },
        component: HomeView
    },
    {
        path: '/login',
        name: '/login',
        component: () => import('../views/login/login.vue')
    }
];

/**
 * 获取路由配置
 * 1、静态路由需注释掉本段的前三行代码
 * 2、一般用于根据不同的用户展示不同的菜单
 * 3、此处应是一个接口请求，请求接口获取路由信息，（注意同步请求）
 *  axios(XXX).then(res=>{
 *      let data = res.data;
 *      let menusList = [];
 *      routersData(routerData, menusList);
 *      routes[0].children = menusList;
 *  })
 */
let targetRoutes = [];
routersData(routerData, targetRoutes);
routes[0].children = targetRoutes;
// 如果路由不需要自定重定向第一个子项，可将下一行删除
routes[0].redirect = targetRoutes[0].path;
export default routes;

/**
 * 处理路由配置，将接口中获取的路由处理成符合vue-router格式的路由
 * @param {*} todoRes 需要处理的路由
 * @param {*} targetRes 存放处理后符合要求的路由
 */
export function routersData(todoRes, targetRes) {
    todoRes.forEach((item, index) => {
        let path = item.href,
            lastPath = path.split('/').pop();
        let authority = routerConfig[path] || {};
        targetRes.push({
            path: path,
            name: path,
            component: () => import(`@/views/main${path}/${lastPath}.vue`),
            meta: {
                title: item.title || item.name,
                hiddenHeader: !!item.hiddenHeader || authority['hiddenHeader'],
                hiddenLeftMenu: !!item.hiddenLeftMenu || authority['hiddenLeftMenu'],
                hiddenCrumbs: !!item.hiddenCrumbs || authority['hiddenCrumbs'],
                ...(item.meta || {})
            }
        });

        let children = item.childs || item.children;
        if (Array.isArray(children) && children.length > 0) {
            // 如果路由不需要自定重定向第一个子项，可将下一行删除
            targetRes[index].redirect = children[0].href;
            targetRes[index].children = [];
            routersData(children, targetRes[index].children);
        }
    });
}

/**
 * 确定路由对应的组件是否存在
 * @param {*} curPath  当前路由地址
 * @param {*} allRoutes 已经加载的所有路由
 * @returns {object}
 *      isExist 是否存在对应组件
 *      parentPath 父级路径
 *      routerConfig 路由配置
 */
export const existComp = (curPath, allRoutes) => {
    let isExist = allRoutes.filter(item => curPath.includes(item.path));
    let maxLongPath = '',
        routerConfigData;
    if (Array.isArray(isExist) && isExist.length > 0) {
        isExist.forEach(item => {
            if (item.path.length > maxLongPath) {
                maxLongPath = item.path;
            }
        });
        if (maxLongPath) {
            let lastPath = curPath.split('/').pop();
            let authority = routerConfig[curPath] || {};
            try {
                require(`@/views/main${curPath}/${lastPath}.vue`);
            } catch (e) {
                maxLongPath = '';
            }
            if (maxLongPath) {
                routerConfigData = {
                    path: curPath,
                    name: curPath,
                    component: () => import(`@/views/main${curPath}/${lastPath}.vue`),
                    meta: {
                        title: authority.title || authority.name,
                        hiddenHeader: !!authority.hiddenHeader || authority['hiddenHeader'],
                        hiddenLeftMenu: !!authority.hiddenLeftMenu || authority['hiddenLeftMenu'],
                        hiddenCrumbs: !!authority.hiddenCrumbs || authority['hiddenCrumbs'],
                        ...(authority.meta || {})
                    }
                };
            }
        }
    }
    return {
        isExist: !!maxLongPath,
        parentPath: maxLongPath,
        routerConfig: routerConfigData
    };
};
