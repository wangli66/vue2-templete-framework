<template>
    <div class="self-table-container" :style="tableConStyle" v-loading="loading">
        <div class="operate-content" v-if="operateContentVisible">
            <div class="left-content">
                <slot></slot>
            </div>
            <div class="center-content">
                <slot name="center"> </slot>
            </div>
            <div class="right-content">
                <slot name="right">
                    <el-input
                        placeholder="请输入您要搜索的内容"
                        clearable
                        size="small"
                        @clear="handleRefresh"
                        v-model="searchInputObj.input"
                        class="self-search-input"
                    >
                        <el-button slot="append" size="small" @click="handleSearch">
                            <i class="el-icon-search"></i>
                        </el-button>
                    </el-input>
                    <i v-if="showRefresh" class="el-icon-refresh self-operate-btn" @click="handleRefresh"></i>
                    <table-column-sieving v-if="showColumnBtn" v-model="columns"></table-column-sieving>
                </slot>
            </div>
            <div class="operate-clear"></div>
        </div>
        <!-- 表头上方的内容 -->
        <slot name="table-top-content"></slot>
        <!-- 表格还缺少一个筛选列内容的 -->
        <el-table
            border
            class="self-table"
            ref="selfInnerTable"
            :data="tableData"
            style="width: calc(100% - 0px)"
            v-bind="$attrs"
            v-on="$listeners"
            @select="handleSelect"
            @select-all="handleSelectAll"
        >
            <el-table-column v-if="showIndex" type="index" width="50" :label="showIndexLabel"></el-table-column>
            <el-table-column type="expand" v-if="expand" width="30">
                <template slot-scope="props">
                    <slot name="expand" :scope="props"></slot>
                </template>
            </el-table-column>
            <template v-if="selection">
                <el-table-column :selectable="selectable" type="selection" width="45" align="center"> </el-table-column>
                <!-- <template v-if="selectable">
                    <el-table-column :selectable="selectable" type="selection" width="45" align="center">
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                </template> -->
            </template>
            <template v-for="column in columns">
                <el-table-column
                    v-if="!column.hidden"
                    :key="column.prop"
                    :prop="column.prop"
                    :label="column.label"
                    :sortable="!!column.sortable"
                    :show-overflow-tooltip="!column.noShowtooltip"
                    :header-align="column.headerAlign ? column.headerAlign : 'left'"
                    :fixed="column.fixed ? column.fixed : false"
                    :align="column.align ? column.align : 'left'"
                    :width="column.width"
                    :min-width="column.minWidth"
                >
                    <template slot-scope="scope">
                        <slot :name="column.prop" :scope="scope">
                            {{ scope.row[column.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <div class="self-pagination" v-if="paginationVisible">
            <el-pagination
                :key="pageKey"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :pageSizes="pageSizes"
                :layout="pageLayout"
                :total="totalPage"
                :pager-count="pagerCountParams"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import _script from './index.js';

export default _script;
</script>

<style lang="less">
@import url(./style.less);
</style>
