// import pagitionMixin from '@/utils/pagitionMixin.js';
import TableColumnSieving from '../tableColumnSieving/TableColumnSieving.vue';

export default {
    name: 'selfTable',
    inheritAttrs: false,
    props: {
        // 是否有复选框
        selection: {
            type: Boolean,
            default: false
        },
        // 是否保存复选框的选中状态
        saveSelect: {
            type: Boolean,
            default: false
        },
        // 保存复选框的选中状态时的用于唯一识别的id
        saveSelectId: {
            type: String,
            default: 'id'
        },
        // 是否显示索引
        showIndex: {
            type: Boolean,
            default: false
        },
        showIndexLabel: {
            type: String,
            default: '序号'
        },
        // 是否有展开行
        expand: {
            type: Boolean,
            default: false
        },
        //请求后台的数据，包括总条数，和表格的数据
        ajaxData: {
            type: Object,
            default() {
                return {};
            }
        },
        // 列配置
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        // 异步请求的名字
        ajaxRequestName: {
            type: String,
            default: 'ajaxTableData'
        },
        showSearchInput: {
            //是否显示搜索输入框
            default() {
                return true;
            }
        },
        showRefresh: {
            ////是否显示刷新
            default() {
                return true;
            }
        },
        showColumnBtn: {
            //是否列筛选按钮
            default() {
                return true;
            }
        },
        // 显示的最大分页的数量
        pagerCountParams: {
            type: Number,
            default: 9
        },
        // 是否显示操作栏，默认显示
        operateContentVisible: {
            type: Boolean,
            default: true
        },
        // 是否显示分页信息
        paginationVisible: {
            type: Boolean,
            default: true
        },
        tableConStyle: {
            default() {
                return {};
            }
        },
        // 调用和被调用组件之间是否是父子关系
        isParent: {
            default: true
        },
        selectable: {
            type: Function
        },
        // 显示加载的样式
        loadingStyle: {
            type: Object,
            default() {
                return {
                    lock: true,
                    text: '拼命加载中......',
                    // spinner: 'el-loading-spinner',
                    background: 'rgba(255,255,255,.9)'
                };
            }
        }
    },
    components: {
        TableColumnSieving
    },
    data() {
        return {
            tableData: [],
            // tableData: [
            //     { date: '1', name: '2', address: '3' },
            //     { date: '1', name: '2', address: '3' },
            //     { date: '1', name: '2', address: '3' },
            //     { date: '1', name: '2', address: '3' },
            //     { date: '1', name: '2', address: '3' },
            // ],
            // columns: [
            //     { prop: 'date', label: '方案名称', minWidth: '120px', sortable: true, },
            //     { prop: 'name', label: '场景类型', minWidth: '80px', sortable: true, },
            //     { prop: 'address', label: '要素类型', minWidth: '80px', sortable: true, },
            // ]
            pageSizes: [10, 20, 30, 50], //表格可以显示哪些页码
            pageSize: 10, //表格显示多少条数据
            pagerCount: 7,
            pageLayout: 'total, sizes, prev, pager, next, jumper',
            pageLayoutSimple: 'total, prev, pager, next', //页码的布局顺序
            totalPage: 0, //总条数
            currentPage: 1, //当前显示第几页，从1开始
            searchInput: '', //辅助  表格右上方的搜索
            searchInputObj: {
                //用于在表格上方操作按钮的组件中进行数据双向绑定，和searchInput作用一样
                input: ''
            },
            saveSelectObj: {}, //保存复选框的选中时数据
            //辅助，ajax的时候loading
            loading: false,
            loadingObj: {
                lock: true,
                text: '拼命加载中',
                spinner: 'el-loading-spinner', //el-loading-spinner   el-icon-loading
                background: 'rgba(255,255,255,.9)'
            },
            loadingInstance: null,
            pageKey: 1,
            operateType: 0 //操作类型，表示当前数据查询是否为搜索或刷新，0->常规，1->搜索，2->刷新
        };
    },
    watch: {
        ajaxData: {
            deep: true,
            handler(newVal) {
                // this.loading = false;
                this.totalPage = newVal.totalRecords || 0;
                this.tableData = newVal.data || [];
                //处理复选框的选中状态
                if (this.saveSelect) {
                    this.$nextTick(() => {
                        let saveSelectToObj = this.getSaveSelectToObj();
                        let id = this.saveSelectId;
                        this.tableData.forEach(row => {
                            let idVal = row[id];
                            if (saveSelectToObj[idVal]) {
                                this.$refs.selfInnerTable.toggleRowSelection(row, true);
                            }
                        });
                    });
                }
            }
        },
        currentPage(a, b) {
            // debugger
            console.log(a, b);
        }
    },
    methods: {
        handleSelect(selection, row) {
            // this.$emit('emitSelect', selection, row);
            this.saveSelectData(selection);
            this.$emit('select', selection, row);
        },
        handleSelectAll(selection) {
            this.saveSelectData(selection);
            // this.$emit('emitSelectAll', selection);
            this.$emit('select-all', selection);
        },
        // 复选框发生改变时
        // handleSelectionChange(selection) {
        //     this.saveSelectData(selection);
        //     // this.$emit('emitSelectionChange', selection);
        //     this.$emit('selection-change', selection);
        // },
        saveSelectData(selection) {
            if (this.saveSelect) {
                this.saveSelectObj[this.currentPage] = selection;
            }
        },
        // 得到保存的数据，返回对象
        getSaveSelectToObj() {
            let obj = {};
            let id = this.saveSelectId;
            let arr = this.getSaveSelectToArr();
            arr.forEach(row => {
                let idVal = row[id];
                obj[idVal] = row;
            });
            return obj;
        },
        // 得到保存的数据，返回数组
        getSaveSelectToArr() {
            let arr = [];
            Object.keys(this.saveSelectObj).forEach(page => {
                arr = arr.concat(this.saveSelectObj[page]);
            });
            return arr;
        },
        // 当前页显示条数发生改变
        handleSizeChange(val) {
            this.$emit('emitSizeChange', val);
            this.pageSize = val;
            this.ajaxTableData();
        },
        // 当前页发生改变
        handleCurrentChange(val) {
            this.$emit('emitCurrentChange', val);
            this.currentPage = val;
            this.ajaxTableData();
        },
        // 调用父组件的方法
        ajaxTableData() {
            let ajaxName = this.ajaxRequestName;
            let pAjaxMethod = this.$parent[ajaxName];
            if (this.isParent && pAjaxMethod) {
                pAjaxMethod();
            } else if (this.isParent == false || !pAjaxMethod) {
                let pageParams = this.getParams();
                this.$emit('emitAjaxTableData', pageParams);
            }
        },
        // 处理删除操作后的页码变化
        // obj 对象 delNum 默认为1
        dealDelPageNum(obj) {
            let delNum = 1;
            if (obj && typeof obj == 'number') {
                delNum = obj;
            } else if (obj && obj.delNum) {
                delNum = obj.delNum;
            }
            let pageParams = this.getParams();
            let totalRecords = this.ajaxData.totalRecords;
            let maxPageNum = Math.ceil((totalRecords - delNum) / pageParams.limit);
            if (maxPageNum < this.currentPage) {
                this.currentPage = Number(maxPageNum);
            }
        },
        // 删除记录条数 amount
        deleteAmount(delNum = 1) {
            if (typeof delNum != 'number') {
                delNum = Number(delNum);
            }
            let pageParams = this.getParams();
            let totalRecords = this.ajaxData.totalRecords;
            let maxPageNum = Math.ceil((totalRecords - delNum) / pageParams.limit);
            if (maxPageNum < this.currentPage) {
                this.currentPage = Number(maxPageNum);
            }
        },
        // 设置当前页
        setCurrentPage(page) {
            if (typeof page == 'string') {
                page = Number(page);
            }
            this.currentPage = page > 0 ? page : 1;
            this.pageKey += 1;
        },
        // 设置每页显示的数量
        setPageSize(num) {
            if (typeof page == 'string') {
                num = Number(num);
            }
            this.pageSize = num;
            this.pageKey += 1;
        },
        // 获取属于表格的参数 init:true  表示清空，刷新
        getParams(init = '') {
            let operateType = this.operateType;
            if (init === true) {
                this.searchInputObj.input = '';
                this.currentPage = 1;
                this.pageSize = 10;
                this.saveSelectObj = {};
            }
            this.operateType = 0;
            return {
                limit: this.pageSize,
                page: this.currentPage,
                condition: this.searchInputObj.input,
                operateType: operateType
            };
        },
        // 搜索
        handleSearch() {
            this.currentPage = 1;
            this.operateType = 1;
            this.saveSelectObj = {};
            this.ajaxTableData();
        },
        // 刷新
        handleRefresh() {
            this.operateType = 2;
            this.searchInputObj.input = '';
            this.currentPage = 1;
            this.saveSelectObj = {};
            this.ajaxTableData();
        },
        showLoading(isShow) {
            if (isShow) {
                this.loadingInstance = this.$loading(this.loadingStyle);
            } else {
                this.loadingInstance && this.loadingInstance.close();
            }
        }
    },
    mounted() {
        this.totalPage = this.ajaxData.totalRecords || 0;
        this.tableData = this.ajaxData.data || [];
    }
};
