export default {
    data() {
        return {
            name: 'name'
        };
    },
    methods: {
        async test() {
            const About = () => import('../../test/test.vue');
            this.$router.addRoute({ path: '/test', component: About });
            await this.$router.replace('/test');
        }
    }
};
