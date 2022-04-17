import selfMenuList from '@/components/menuList/menuList.vue';
import { dealMenuData } from '@/components/menuList/mixins.js';

export default {
    components: { selfMenuList },
    mixins: [dealMenuData],
    data() {
        return {
            menuList: [],
            userName: ''
        };
    },
    methods: {
        handleLogin() {
            // this.$router.push({ path: '/loginAndReg' });
            this.$alert('登录请自定义开发');
        },
        handleQuit() {
            // this.$storage.clearS('userId');
            // this.$storage.clearS('token');
            // this.$storage.clearS('userName');
            // this.$router.push({ path: '/loginAndReg' });
        },
        initMenu() {
            let routeList = this.$router.options.routes;
            routeList = routeList[0].children;
            let menuList = [];
            this.forEachMenu(routeList, menuList);
            this.menuList = menuList;
        }
    },
    created() {
        this.initMenu();
    },
    mounted() {
        // this.userName = this.$storage.getS('userName');
    }
};
