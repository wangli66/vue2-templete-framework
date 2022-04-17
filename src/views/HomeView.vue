<template>
    <el-container class="home-container">
        <home-header v-show="showHeader"></home-header>
        <el-container>
            <home-aside v-if="showAside"></home-aside>
            <el-main class="home-main">
                <home-crumbs v-if="showCurmbs"></home-crumbs>
                <div class="main-view">
                    <router-view />
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// @ is an alias to /src
import homeHeader from './header/header.vue';
import homeAside from './aside/aside.vue';
import homeCrumbs from '@/components/breadCrumb/breadCrumb.vue';

export default {
    name: 'Home',
    components: {
        homeHeader,
        homeAside,
        homeCrumbs
    },
    data() {
        return {
            showHeader: true,
            showAside: false,
            showCurmbs: false
        };
    },
    watch: {
        $route() {
            this.dealAsideShow();
        }
    },
    methods: {
        dealAsideShow() {
            let route = this.$route;
            if (route.meta) {
                this.showHeader = !route.meta.hiddenHeader;
                this.showAside = !route.meta.hiddenLeftMenu;
                this.showCurmbs = !route.meta.hiddenCrumbs;
            }
        }
    },
    mounted() {
        this.dealAsideShow();
    }
};
</script>

<style lang="less">
.el-container.home-container {
    height: 100vh;
    flex-direction: column;
}

.el-main.home-main {
    padding: 0px;
}
.main-view {
    padding: 20px;
}
</style>
