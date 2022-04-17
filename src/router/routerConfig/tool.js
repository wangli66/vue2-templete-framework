const layout = [{
    path: '/tool/routers',
    name: '/tool/routers',
    component: () => import('../../views/main/tool/routers/routers.vue'),
    meta: {
        name: '路由配置',
    }
}, {
    path: '/tool/disabledClick',
    name: '/tool/disabledClick',
    component: () => import('../../views/main/tool/routers/routers.vue'),
    meta: {
        name: '不可点击菜单',
        disabled: true,
    }
}, {
    path: '/function/function2',
    name: 'function-function2',
    component: () => import('../../views/main/function/function1/function1.vue'),
    meta: {
        name: '菜单的外部链接',
        isLinkUrl: 'https://www.baidu.com'
    }
}, {
    path: '/tool/http',
    name: '/tool/http',
    component: () => import('../../views/main/tool/http/http.vue'),
    meta: {
        name: '封装的请求',
    }
}, {
    path: '/tool/storage',
    name: '/tool/storage',
    component: () => import('../../views/main/tool/storage/storage.vue'),
    meta: {
        name: 'storage存储',
    }
}, {
    path: '/tool/others',
    name: '/tool/others',
    component: () => import('../../views/main/tool/others/others.vue'),
    meta: {
        name: '其他',
    }
}];
export default layout;