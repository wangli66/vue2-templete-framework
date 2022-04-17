/**
 * 功能：监测路由是否发生改变
 * @param {*} to
 * @param {*} from
 * @returns
 */
const isRouteUpdate = function (to, from) {
    if (to.fullPath === from.fullPath) return false; // 页面初始进入或刷新
    if (from.matched.length !== to.matched.length) return false;
    return from.matched.every((record, i) => record === to.matched[i]);
};

/**
 * 功能：滚动行为
 * 1、前进、后退操作时，模拟浏览器原生行为
 * 2、模拟 滚动到锚点 行为
 * 3、其他情况，让页面滚动到顶部
 * @param {*} to
 * @param {*} from
 * @param {*} savedPosition
 * @returns
 */
export default function (to, from, savedPosition) {
    if (!isRouteUpdate(to, from)) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { selector: to.hash };
        return { x: 0, y: 0 };
    }
}
