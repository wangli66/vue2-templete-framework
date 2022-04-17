export default {
    name: 'BreadCrumb',
    props: {
        //是否包含路由最外层的位置
        isIncludeHome: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    watch: {
        $route(to, from) {
            this.getBreadcrumb(to, from);
        }
    },
    computed: {
        breadList() {
            return this.$store.state.crumb.crumbData;
        }
    },
    methods: {
        recordCurmb(data, name = 'crumbData') {
            // this.$storage.setL({ key: name, value: data });
        },
        getBreadcrumb(to, from) {
            let route = this.$route;
            let matched = [];
            let curPath = route.path;
            let crumbData = this.$store.state.crumb.crumbData;

            // 点击的路由在面包屑已存在的路由当中
            let filter = crumbData.filter(item => item.path === curPath);
            if (filter.length > 0) {
                let index = crumbData.findIndex(item => item.path === curPath);
                matched = crumbData.splice(0, index + 1);
                this.$store.commit('crumb/getCrumbRoute', matched);
                this.recordCurmb(matched);
                return false;
            }
            matched = route.matched.map((item, index) => {
                let meta = item.meta || {};
                return {
                    path: item.path,
                    name: meta.title,
                    noCrumb: meta.noCrumb,
                    noCrumbLink: meta.noCrumbLink
                };
            });
            if (this.isIncludeHome) {
                matched.shift();
            }
            matched = matched.filter(item => !item.noCrumb);
            this.$store.commit('crumb/getCrumbRoute', matched);
            this.recordCurmb(matched);
        }
    },
    created() {
        this.getBreadcrumb();
    }
};
