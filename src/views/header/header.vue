<template>
    <el-header class="home-header">
        <div class="left-content">
            <div class="logo">
                <img src="./../../assets/header/logo.png" />
            </div>
            <span class="title">网站前端框架设计及功能说明</span>
        </div>
        <div class="menu-content">
            <self-menu-list :menuList="menuList" background-color="#323330" text-color="#ffffff" active-text-color="#ffd04b"></self-menu-list>
        </div>
        <div class="right-content">
            <template v-if="!userName">
                <span class="linked" @click="handleLogin">欢迎登陆</span>
            </template>
            <template v-else>
                {{ userName }}
                <span class="linked" @click="handleQuit">注销</span>
            </template>
        </div>
    </el-header>
</template>

<script>
import _script from './index.js';
export default _script;
</script>

<style lang="less">
@import url('style.less');
</style>
