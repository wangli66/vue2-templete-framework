/**
 * 用户含有分页功能的页面
 * 集成分页信息，搜索字段
 */
const pagitionMixin = {
    data() {
        return {
            pageSizes: [10, 20, 30, 50], //表格可以显示哪些页码
            pageSize: 10, //表格显示多少条数据
            pagerCount: 1,
            pageLayout: 'total, sizes, prev, pager, next, jumper',
            pageLayoutSimple: 'total, prev, pager, next', //页码的布局顺序
            totalPage: 0, //总条数
            currentPage: 1, //当前显示第几页，从1开始
            searchInput: '', //辅助  表格右上方的搜索
            searchInputObj: {
                //用于在表格上方操作按钮的组件中进行数据双向绑定，和searchInput作用一样
                input: ''
            },
            //辅助，ajax的时候loading
            loading: false,
            loadingObj: {
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            }
        };
    },
    methods: {
        // 当前页显示条数发生改变
        handleSizeChange(val) {
            this.pageSize = val;
            this.ajaxTableData();
        },
        // 当前页发生改变
        handleCurrentChange(val) {
            this.currentPage = val;
            this.ajaxTableData();
        },
        // 得到请求参数
        getParams() {
            return {
                page: this.currentPage,
                limit: this.pageSize,
                condition: this.searchInputObj.input
            };
        },
        /**
         * 刷新
         * @param {*} obj
         * obj.input -> 是否初始化输入内容 默认初始化 false:初始化   true：不初始化
         * obj.limit -> .....页码,默认不初始化 false:不初始化   ture：初始化
         */
        initParams(obj = {}) {
            if (!obj.input) {
                this.searchInputObj.input = '';
            }
            if (obj.limit) {
                this.limit = this.pageSize;
            }
            this.currentPage = 1;
        }
    }
};
export default pagitionMixin;
