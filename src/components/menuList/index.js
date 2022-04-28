import selfSubMenu from './subMenu.vue';

export default {
    inheritAttrs: false,
    name: 'menuList',
    components: { selfSubMenu },
    props: {
        menuList: Array,
        mode: {
            type: String,
            default: 'horizontal' //horizontal / vertical
        },
        defaultActiveIndex: {
            default: ''
        },
        keyName: {
            type: String,
            default: 'self-menu-001'
        }
    },
    data() {
        return {
            activeIndex: '',
            keyVal: 1,
            menuData: []
        };
    },
    watch: {
        menuList: {
            deep: true,
            handler(newVal) {
                this.menuData = [];
                this.menuData = newVal;
                this.keyVal++;
                this.dealActiveIndex();
            }
        },
        $route(to, from) {
            this.dealActiveIndex();
        }
    },
    methods: {
        dealActiveIndex(type) {
            this.$nextTick(() => {
                this.activeIndex = this.$route.path;
            });
        },
        handleClickMenu(menu, e) {
            e.stopPropagation();
            window.open(menu.isLinkUrl, '_blank');
            return false;
        }
    },
    mounted() {
        this.menuData = this.menuList;
        let a = this.menuData;
        if (this.defaultActiveIndex) {
            this.activeIndex = this.defaultActiveIndex;
        } else {
            this.dealActiveIndex();
        }
    }
};
