<template>
    <div class="bread-crumb-container">
        <el-breadcrumb separator="/">
            <template v-for="(item, index) of breadList">
                <template v-if="item.noCrumbLink">
                    <el-breadcrumb-item :key="index + '-' + item.name">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </template>
                <template v-else>
                    <el-breadcrumb-item :key="index + '-' + item.name" :to="{ path: item.path, query: item.query }">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </template>
            </template>
        </el-breadcrumb>
    </div>
</template>

<script>
import _script from './index';

export default _script;
</script>

<style lang="less">
@import url(./style.less);
</style>
