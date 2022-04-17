import selfMenuList from '@/components/menuList/menuList.vue';
import { dealMenuData } from '@/components/menuList/mixins.js';

export default {
    components: { selfMenuList },
    mixins: [dealMenuData],
    data() {
        return {
            menuList: [],
            currentPath: ''
        };
    },
    watch: {
        $route(newVal) {
            let currentPath = this.$route.path;
            currentPath = currentPath.split('/');
            currentPath = currentPath[0] || currentPath[1];
            if (!this.currentPath.includes(currentPath)) {
                this.currentPath = this.$route.path;
                this.initMenu();
            }
        }
    },
    methods: {
        initMenu() {
            let routeList = this.$router.options.routes;
            routeList = routeList[0].children;
            this.menuList = routeList;
            let curPath = this.$route.path;
            let filterArr = routeList.filter(item => curPath.includes(item.path));
            let menuList = [];
            this.forEachMenu(filterArr[0].children, menuList);
            this.menuList = menuList;
        }
    },
    created() {
        this.currentPath = this.$route.path;
        this.initMenu();
    }
};
