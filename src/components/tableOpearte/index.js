// import pagitionMixin from '@/utils/pagitionMixin.js';
import TableColumnSieving from '@/components/tableColumnSieving/TableColumnSieving.vue';

/**
 * 在父组件中要加这两个方法
 * emitSearchInput   模糊搜索后的查询
 * emitRefresh  刷新表格
 */
export default {
    // mixins: [pagitionMixin],
    props: {
        tableColumns: {
            default() {
                return [];
            }
        },
        searchInputObj: {
            //对象，包含搜索字段
            default() {
                return {
                    input: ''
                };
            }
        },
        searchInput: {
            default() {
                return '';
            }
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
        }
    },
    data() {
        return {
            name: ''
        };
    },
    components: {
        TableColumnSieving
    },
    methods: {
        handleSearchInput() {
            if (this.$parent.emitSearchInput) {
                this.$parent.emitSearchInput();
            } else {
                this.$emit('emitSearchInput', this.searchInputObj);
            }
        },
        handleRefresh() {
            if (this.$parent.emitRefresh) {
                this.$parent.emitRefresh();
            } else {
                this.$emit('emitRefresh', this.searchInputObj);
            }
        }
    },
    mounted() {}
};
