const functionName = [{
    path: '/function/tableFunction',
    name: 'function-table',
    component: () => import('../../views/main/function/tableFunction/tableFunction.vue'),
    meta: {
        name: '表格组件',
    }
}, {
    path: '/function/dragResizeFunction',
    name: 'function-dragresize',
    component: () => import('../../views/main/function/dragResizeFunction/dragResizeFunction.vue'),
    meta: {
        name: '拖拽缩放组件',
    }
}, {
    path: '/function/function1',
    name: 'function-function1',
    component: () => import('../../views/main/function/function1/function1.vue'),
    meta: {
        name: '拖拽图片',
        // noMenu: true,
    }
}]
export default functionName;