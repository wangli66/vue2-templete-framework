<template>
    <div class="table-column-sieving-container flex">
        <el-dropdown trigger="click" :hide-on-click="false">
            <span class="el-dropdown-link">
                <slot>
                    <i class="el-icon-menu self-icon-sieving"></i>
                </slot>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选 </el-checkbox>
                </el-dropdown-item>
                <el-checkbox-group v-model="checkedArr" @change="handleCheckedChange" :min="1">
                    <el-dropdown-item v-for="item in value" :key="item.prop">
                        <el-checkbox :label="item.prop" :disabled="item.disabled">{{ item.label }}</el-checkbox>
                    </el-dropdown-item>
                </el-checkbox-group>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import _script from './index';

export default _script;
</script>

<style lang="less">
@import url(./style.less);
</style>
