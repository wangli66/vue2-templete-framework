<template>
    <el-aside class="home-aside" style="width: 200px">
        <div class="menu-content">
            <div class="menu-item">导航栏</div>
            <self-menu-list
                :keyName="'aside-menu-002'"
                :menuList="menuList"
                mode="vertical"
                background-color="#323330"
                text-color="#ffffff"
                active-text-color="#ffd04b"
            >
            </self-menu-list>
        </div>
    </el-aside>
</template>

<script>
import _script from './index.js';
export default _script;
</script>

<style lang="less">
@import url('style.less');
</style>
