/**
 * 此处是模拟的路由配置
 *      1、如果项目是静态路由，在此处配置即可，或在routes.js中直接配置也可
 *      2、如果是路由从接口中获取，则在routes.js中获取路由信息，此处路由配置可删除
 */
export const routerData = [
    // 第一项，是从接口中获取的常见配置数据格式
    {
        'href': '/layout',
        'title': '布局',
        'childs': [
            { 'href': '/layout/style1', 'title': '上左右' },
            { 'href': '/layout/style2', 'title': '上下带面包屑' },
            { 'href': '/layout/style3', 'title': '上下无面包屑' },
            { 'href': '/layout/style4', 'title': '只有一个主体' }
        ]
    },
    // 第二项，大多是自定义处理的结果
    {
        'href': '/menuFunction',
        'title': '菜单功能',
        'childs': [
            { 'href': '/menuFunction/innerMenu', 'title': '项目内链接' },
            {
                'href': 'disabledMenu',
                'title': '可不点击的链接',
                'meta': {
                    disabled: true
                }
            },
            {
                'href': 'outerMenu',
                'title': '跳转到外部链接',
                'meta': {
                    isLinkUrl: 'https://www.baidu.com'
                }
            }
        ]
    }
];

/**
 * 1、布局处理，为了处理在接口没有定义隐藏头部，左侧菜单等的情况
 * 2、如果是静态路由，在routes.js中直接配置即可
 */
export const routerConfig = {
    '/layout/style2': { hiddenLeftMenu: true },
    '/layout/style3': { hiddenLeftMenu: true, hiddenCrumbs: true },
    '/layout/style4': { hiddenHeader: true, hiddenLeftMenu: true, hiddenCrumbs: true },
    '/layout/test': {
        title: '测试的标题'
    }
};
