<template>
    <el-submenu :index="subMenu.path" :popper-append-to-body="false" popper-class="self-sub-menu">
        <template slot="title">{{ subMenu.title || subMenu.name }}</template>
        <template v-if="subMenu.children && subMenu.children.length > 0">
            <template v-for="(subItem, subItemIndex) of subMenu.children">
                <template v-if="subItem.children && subItem.children.length > 0">
                    <default-sub-menu :key="subItem.path + '-' + subItemIndex" :data="subItem"> </default-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :key="subItem.path" :index="subItem.path" :class="{ 'el-submenu-link-url': subItem.isLinkUrl }" :disabled="subItem.disabled">
                        <template v-if="subItem.isLinkUrl">
                            <span class="link-url" @click.stop="handleClickMenu(subItem, $event)"> {{ subItem.title || subItem.name }}</span>
                        </template>
                        <template v-else> {{ subItem.title || subItem.name }} </template>
                    </el-menu-item>
                </template>
            </template>
        </template>
        <!-- <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
    </el-submenu>
</template>

<script>
export default {
    props: {
        data: Object
    },
    name: 'defaultSubMenu',
    data() {
        return {
            subMenu: {}
        };
    },
    methods: {
        handleClickMenu(subItem, e) {
            e.stopPropagation();
            window.open(subItem.isLinkUrl, '_blank');
            return false;
        }
    },
    created() {
        this.subMenu = this.data;
    }
};
</script>

<style lang="less"></style>
