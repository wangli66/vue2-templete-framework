<template>
    <div class="common-main-container">
        <div class="pad-20">
            具体使用请看文档:<a href="http://wangli66.gitee.io/vue2-templete-framework/" target="_blank">http://wangli66.gitee.io/vue2-templete-framework/</a>
        </div>
        <div class="pad-20">
            <el-button size="medium" v-for="item of layoutList" :key="item.url" @click="handleLink(item)">
                {{ item.name }}
            </el-button>
        </div>
        <router-view />
    </div>
</template>

<script>
import _script from './index.js';
export default _script;
</script>

<style lang="less">
// @import url('./style.less');
</style>
