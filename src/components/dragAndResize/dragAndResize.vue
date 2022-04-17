<template>
    <div class="drag-and-resize-container" :style="style" :class="[containerClassName]">
        <slot name="header">
            <div class="drag">标题</div>
        </slot>
        <slot></slot>
        <div
            v-for="(handle, index) of handles"
            :class="[handleClass, handleClass + '-' + handle]"
            :key="'dv-handle-' + index"
            @mousedown.stop.prevent="handleDown(handle, $event)"
        ></div>
    </div>
</template>

<script>
// import _script from './dragAndResize.js';
// export default _script;
</script>

<style lang="less">
@import url('./dragAndResize.less');
</style>
