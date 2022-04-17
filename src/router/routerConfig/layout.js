const layout = [
    {
        path: '/layout/style1',
        name: '/layout/style1',
        component: () => import('../../views/main/layout/style1/style1.vue'),
        meta: {
            name: '上左右'
        }
    },
    {
        path: '/layout/style2',
        name: '/layout/style2',
        component: () => import('../../views/main/layout/style2/style2.vue'),
        meta: {
            name: '上下带面包屑',
            hiddenLeftMenu: true
        }
    },
    {
        path: '/layout/style3',
        name: '/layout/style3',
        component: () => import('../../views/main/layout/style3/style3.vue'),
        meta: {
            name: '上下无面包屑',
            hiddenLeftMenu: true,
            hiddenCrumbs: true
        }
    },
    {
        path: '/layout/style4',
        name: '/layout/style4',
        component: () => import('../../views/main/layout/style4/style4.vue'),
        meta: {
            name: '只有一个主体',
            hiddenHeader: true,
            hiddenLeftMenu: true,
            hiddenCrumbs: true
        }
    }
];
export default layout;
