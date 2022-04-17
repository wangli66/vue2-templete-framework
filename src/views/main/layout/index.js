export default {
    data() {
        return {
            layoutList: [
                { name: '上左右布局', url: '/layout/style1' },
                { name: '上下带面包屑', url: '/layout/style2' },
                { name: '上下无面包屑', url: '/layout/style3' },
                { name: '只有一个主体部分', url: '/layout/style4' }
            ]
        };
    },
    methods: {
        handleLink(item) {
            this.$router.push({
                path: item.url
            });
        }
    }
};
