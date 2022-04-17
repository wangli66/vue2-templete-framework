<template>
    <div class="table-operate-container">
        <div class="self-left">
            <slot></slot>
        </div>
        <div class="self-center">
            <slot name="center"></slot>
        </div>
        <div class="self-right">
            <slot name="right">
                <el-input v-if="showSearchInput" size="small" class="w180" placeholder="请输入内容" v-model="searchInputObj.input">
                    <template slot="append">
                        <i class="el-icon-search" @click="handleSearchInput"></i>
                    </template>
                </el-input>
                <i v-if="showRefresh" class="el-icon-refresh opear-btn" @click="handleRefresh"></i>
                <table-column-sieving v-if="showColumnBtn" v-model="tableColumns"></table-column-sieving>
            </slot>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import _script from './index';

export default _script;
</script>
<style lang="less">
@import url(./style.less);
</style>
