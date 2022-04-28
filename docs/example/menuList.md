---
title: menuList菜单
date: 2021-09-13 17:01:33
---

## 使用说明

-   该组件是在 element-ui 的 NavMenu 基础上，封装而成，使用前请先引入 element-ui
-   该组件的主要功能如下：<br/>

## 基本用法

菜单的基本调用，只需要传递 menuList 菜单数据，数组形式<br/>
子菜单项放在 children 字段中<br/>
name 为菜单的显示名，path 为跳转的地址---router 中配置的地址，icon 为图标的 class<br/>

::: demo

```html
<template>
    <menu-list :menuList="menuList"> </menu-list>
</template>
<script>
    export default {
        data() {
            return {
                menuList: [
                    {
                        name: "菜单1",
                        isLinkUrl: "https://www.baidu.com",
                        icon: "el-icon-setting",
                    },
                    {
                        name: "菜单2",
                        path: "菜单2的地址",
                        icon: "el-icon-document",
                        children: [
                            { name: "菜单2-1", path: "菜单2-1的地址" },
                            { name: "菜单2-2", path: "菜单2-2的地址" },
                        ],
                    },
                    {
                        name: "菜单3",
                        path: "菜单3的地址",
                        icon: "el-icon-location",
                    },
                ],
            };
        },
    };
</script>
```

:::

## 配置样式

配置样式，参考属性说明表格的详情

::: demo

```html
<template>
    <menu-list
        :menuList="menuList2"
        background-color="#323330"
        text-color="#ffffff"
        active-text-color="#ffd04b"
    >
    </menu-list>
</template>
<script>
    export default {
        data() {
            return {
                menuList2: [
                    { name: "菜单1", path: "菜单1的地址" },
                    {
                        name: "菜单2",
                        path: "菜单2的地址",
                        children: [
                            { name: "菜单2-1", path: "菜单2-1的地址" },
                            { name: "菜单2-2", path: "菜单2-2的地址" },
                        ],
                    },
                    {
                        name: "菜单3(三级)",
                        path: "菜单3的地址",
                        children: [
                            { name: "菜单3-1", path: "菜单3-1的地址" },
                            {
                                name: "菜单3-2",
                                path: "菜单3-2的地址",
                                children: [
                                    {
                                        name: "菜单3-2-1",
                                        path: "菜单3-2-1的地址",
                                    },
                                    {
                                        name: "菜单3-2-2",
                                        path: "菜单3-2-2的地址",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
        },
    };
</script>
```

:::

## 垂直菜单

mode 默认水平：'horizontal'，垂直设置：'vertical'

::: demo

```html
<template>
    <div style="width:200px; box-shadow:0 0 10px #ccc;">
        <menu-list :menuList="menuList2" :mode="'vertical'"> </menu-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menuList2: [
                    { name: "菜单1", path: "菜单1的地址" },
                    {
                        name: "菜单2",
                        path: "菜单2的地址",
                        children: [
                            { name: "菜单2-1", path: "菜单2-1的地址" },
                            { name: "菜单2-2", path: "菜单2-2的地址" },
                        ],
                    },
                    { name: "菜单3", path: "菜单3的地址" },
                ],
            };
        },
    };
</script>
```

:::

## 折叠

属性：collapse 控制，boolean

::: demo

```html
<template>
    <el-button type="primary" @click="isCollapse=!isCollapse;">
        {{isCollapse?'展开':'收取'}}
    </el-button>
    <menu-list
        class="menulist-004"
        :menuList="menuList"
        :mode="'vertical'"
        :collapse="isCollapse"
    >
    </menu-list>
</template>
<script>
    export default {
        data() {
            return {
                isCollapse: true,
                menuList: [
                    {
                        name: "菜单1",
                        path: "菜单1的地址",
                        icon: "el-icon-setting",
                    },
                    {
                        name: "菜单2",
                        path: "菜单2的地址",
                        icon: "el-icon-document",
                        children: [
                            { name: "菜单2-1", path: "菜单2-1的地址" },
                            { name: "菜单2-2", path: "菜单2-2的地址" },
                        ],
                    },
                    {
                        name: "菜单3",
                        path: "菜单3的地址",
                        icon: "el-icon-location",
                    },
                ],
            };
        },
    };
</script>
<style>
    .menulist-004.el-menu:not(.el-menu--collapse) {
        width: 240px;
        min-height: 400px;
    }
    .menulist-004.el-menu {
        border-right: solid 1px #e6e6e6;
    }
    .menulist-004.el-menu .self-sub-menu {
        min-width: auto;
    }
</style>
```

:::

## 属性说明

| 参数                | 说明                                                                                | 类型    | 可选值                | 默认值   |
| :------------------ | :---------------------------------------------------------------------------------- | :------ | :-------------------- | :------- |
| menuList            | 渲染的菜单数据;【必传】【数据格式见下面的 menuList 参数说明表格】                   | object  | —                     | —        |
| mode                | 模式                                                                                | string  | horizontal / vertical | vertical |
| collapse            | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）                                | boolean | —                     | false    |
| background-color    | 菜单的背景色（仅支持 hex 格式）                                                     | string  | —                     | #ffffff  |
| text-color          | 菜单的文字颜色（仅支持 hex 格式）                                                   | string  | —                     | #303133  |
| active-text-color   | 当前激活菜单的文字颜色（仅支持 hex 格式）                                           | string  | —                     | #409EFF  |
| default-active      | 当前激活菜单的 index                                                                | string  | —                     | —        |
| default-openeds     | 当前打开的 sub-menu 的 index 的数组                                                 | Array   | —                     | —        |
| unique-opened       | 是否只保持一个子菜单的展开                                                          | boolean | —                     | false    |
| menu-trigger        | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)                                | string  | hover / click         | hover    |
| router              | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | —                     | false    |
| collapse-transition | 是否开启折叠动画                                                                    | boolean | —                     | true     |

### menuList 参数说明

| 参数                  | 说明                                                         | 类型        | 可选值 | 默认值                                 |
| :-------------------- | :----------------------------------------------------------- | :---------- | :----- | :------------------------------------- |
| name\|title           | 菜单名称【必传】                                             | string      |        |                                        |
| path                  | 路由跳转路径【必传】，项目中的路径,如：’/test/test‘          | string      |        |                                        |
| isLinkUrl             | 跳转路径，跳转到项目外的地址：如：’www.baidu.com‘            | string      |        |                                        |
| index                 | 唯一标志，如不设置，则取 path 值                             | string/null | —      | null                                   |
| disabled              | 是否禁用                                                     | boolean     | —      | false                                  |
|                       | 以下参数，仅对有子菜单的菜单项有效                           |             |        |                                        |
| popper-class          | 弹出菜单的自定义类名                                         | string      | —      | —                                      |
| show-timeout          | 展开 sub-menu 的延时                                         | number      | —      | 300                                    |
| hide-timeout          | 收起 sub-menu 的延时                                         | number      | —      | 300                                    |
| popper-append-to-body | 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性 | boolean     | —      | 一级子菜单：true / 非一级子菜单：false |

## 方法说明

| 方法名称 | 说明                | 参数                                |
| :------- | :------------------ | :---------------------------------- |
| open     | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close    | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

## 事件说明

| 事件名称 | 说明                | 回调参数                                                                   |
| :------- | :------------------ | :------------------------------------------------------------------------- |
| select   | 菜单激活回调        | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path              |
| open     | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path |
| close    | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path |
