<template>
    <div class="single-image-container" :style="selfStyle" ref="imageContainer">
        <div class="detail-operate" v-show="showOperate">
            <el-link :underline="false" @click="handFullScreen">
                <i :class="fullType ? 'el-icon-full-screen' : 'el-icon-c-scale-to-original'"></i>{{ fullName }}
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" @click="handZoomIn" :disabled="zoomNum == zoomMax"> <i class="el-icon-zoom-in"></i>放大 </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false" @click="handZoomOut" :disabled="zoomNum == zoomMin"> <i class="el-icon-zoom-out"></i>缩小 </el-link>
        </div>
        <div class="image-wrap">
            <el-image
                ref="image"
                :src="src"
                :class="{ 'full-w': fullType }"
                draggable="false"
                :style="{ 'transform': 'scale(' + zoomNum + ') ', 'width': imgW, 'height': imgH, left: left + 'px', top: top + 'px' }"
                @load="handleLoad"
                @error="handleError"
            >
                <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
            </el-image>
        </div>
    </div>
</template>

<script>
import _script from './index.js';
export default _script;
</script>

<style lang="less">
@import url('./style.less');
</style>
