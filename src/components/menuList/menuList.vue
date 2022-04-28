<template>
    <el-menu
        :key="keyName + '-' + keyVal"
        :default-active="activeIndex"
        class="self-menu-list-container"
        :mode="mode"
        v-bind="$attrs"
        router
        :collapse-transition="false"
    >
        <template v-for="(menu, index) of menuData">
            <template v-if="menu.children && menu.children.length > 0">
                <self-sub-menu :key="'sub-' + index + menu.path" :data="menu"> </self-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :key="'self-menu-' + index" :index="menu.path" :class="{ 'el-submenu-link-url': menu.isLinkUrl }" :disabled="menu.disabled">
                    <i :class="menu.icon" v-if="menu.icon"></i>
                    <template slot="title">
                        <template v-if="menu.isLinkUrl">
                            <span class="link-url" @click.stop="handleClickMenu(menu, $event)"> {{ menu.title || menu.name }}</span>
                        </template>
                        <template v-else>
                            <span>{{ menu.title || menu.name }}</span>
                        </template>
                    </template>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
import _script from './index.js';
export default _script;
</script>

<style lang="less">
@import url('./style.less');
</style>
