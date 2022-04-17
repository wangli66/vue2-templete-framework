import { restrictToBounds, addEvent, removeEvent } from './utils.js';

export default {
    props: {
        w: {
            type: Number,
            default: 200,
            validator: val => val >= 0
        },
        minW: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        maxW: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        h: {
            type: Number,
            default: 200,
            validator: val => val >= 0
        },
        minH: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        maxH: {
            type: Number,
            default: 0,
            validator: val => val >= 0
        },
        x: {
            //left
            type: Number,
            default: -1
        },
        y: {
            //top
            type: Number,
            default: 50
        },
        z: {
            //top
            type: Number,
            default: 99
        },
        initDragable: {
            type: Boolean,
            default: true
        },
        initResizable: {
            type: Boolean,
            default: true
        },
        containerClassName: {
            //容器自定义的class类
            type: String,
            default: 'self-drag-and-resize-style'
        },
        handleDragClass: {
            //拖拽的class类
            type: String,
            default: '.drag'
        },
        handleClass: {
            type: String,
            default: 'dr-wl-stick'
        },
        handles: {
            type: Array,
            default: () => ['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br'],
            validator: val => {
                const s = new Set(['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br']);
                return new Set(val.filter(h => s.has(h))).size === val.length;
            }
        }
    },
    data() {
        return {
            name: 'drag-and-resize',
            dragable: true, //是否可拖拽
            resizable: true, //是否可缩放
            active: false, //标记鼠标move时，是否进行拖拽缩放效果
            operateAble: true, //是否可进行拖拽缩放的操作
            el: null,
            handleDragDom: null, //拖拽的元素

            top: 200,
            left: 200,
            width: 100,
            height: 100,
            minWidth: 100,
            minHeight: 100,
            maxWidth: null,
            maxHeight: null,
            zIndex: 1,

            enabled: this.active,
            resizing: false,
            dragging: false,

            mouseClickPo: {},
            handle: '',
            bounds: {
                minL: 0,
                maxL: 0,
                minT: 0,
                maxT: 0
            }
        };
    },
    computed: {
        style() {
            return {
                top: this.top + 'px',
                left: this.left + 'px',
                width: this.width + 'px',
                height: this.height + 'px',
                zIndex: this.zIndex
            };
        }
    },
    methods: {
        //**调用区 */
        // 改变容器的尺寸，包括长宽，位置等
        changeContainerInit(obj) {
            if (obj.w != undefined) this.width = obj.w;
            if (obj.h != undefined) this.height = obj.h;

            if (obj.x != undefined) this.left = obj.x;
            if (obj.y != undefined) this.top = obj.y;
            if (obj.z != undefined) this.zIndex = obj.z;

            if (obj.minW != undefined) this.minWidth = obj.minW;
            if (obj.minH != undefined) this.minHeight = obj.minH;
            if (obj.maxW != undefined) this.minWidth = obj.minW;
            if (obj.maxH != undefined) this.maxHeight = obj.maxH;
        },
        // 修改是否可操作
        changeOperateAble(obj) {
            if (obj.initDragable != undefined) this.dragable = obj.dragable;
            if (obj.initResizable != undefined) this.resizable = obj.resizable;
        },
        //**实现区 */
        setMouseCLickPo(e) {
            let rect = this.el.getBoundingClientRect();
            let { pageX, pageY } = e;
            this.mouseClickPo = {
                mouseX: pageX,
                mouseY: pageY,
                x: rect.left,
                y: rect.top,
                w: rect.width,
                h: rect.height,
                lastMouseX: pageX,
                lastMouseY: pageY,
                pageX: null,
                pageY: null
            };
        },
        handleDown(handle, e) {
            if (e.stopPropagation) e.stopPropagation();
            this.handle = handle;
            this.resizing = true;
            this.setMouseCLickPo(e);
            addEvent(document.documentElement, 'mousemove', this.move);
            addEvent(document.documentElement, 'mouseup', this.up);
            this.$emit('resizestart', this.left, this.top, this.width, this.height);
        },
        mousedown(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (!this.operateAble) {
                return false;
            }
            this.dragging = true;
            this.setMouseCLickPo(e);
            addEvent(document.documentElement, 'mousemove', this.move);
            addEvent(document.documentElement, 'mouseup', this.up);
            this.$emit('dragstart', this.left, this.top);
        },
        move(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (this.dragging && this.dragable) {
                this.dragMove(e);
            } else if (this.resizing && this.resizable) {
                this.resizeMove(e);
            }
        },
        resizeMove(e) {
            let mouseClickPo = this.mouseClickPo;
            let { pageX, pageY } = e;
            let distX = pageX - mouseClickPo.mouseX;
            let distY = pageY - mouseClickPo.mouseY;
            mouseClickPo.lastMouseX = mouseClickPo.pageX;
            mouseClickPo.lastMouseY = mouseClickPo.pageY;
            this.mouseClickPo = Object.assign({}, mouseClickPo, { pageX, pageY, distX, distY });

            let handle = this.handle;
            let { minL, minT } = this.bounds;
            let { xable, yable } = this.limitRect(this.mouseClickPo);
            if (handle.includes('t') && yable) {
                if (this.maxHeight > this.height || distY > 0) {
                    this.top = restrictToBounds(pageY, minT, mouseClickPo.y + mouseClickPo.h - this.minHeight);
                    this.height = restrictToBounds(mouseClickPo.h - distY, this.minHeight, this.maxHeight);
                }
            } else if (handle.includes('b') && yable) {
                this.height = restrictToBounds(mouseClickPo.h + distY, this.minHeight, this.maxHeight);
            }
            if (handle.includes('l') && xable) {
                if (this.maxWidth > this.width || distX > 0) {
                    this.left = restrictToBounds(pageX, minL, mouseClickPo.x + mouseClickPo.w - this.minWidth);
                    this.width = restrictToBounds(mouseClickPo.w - distX, this.minWidth, this.maxWidth);
                }
            } else if (handle.includes('r') && xable) {
                this.width = restrictToBounds(mouseClickPo.w + distX, this.minWidth, this.maxWidth);
            }
            this.$emit('resizing', this.left, this.top, this.width, this.height);
        },
        dragMove(e) {
            let mouseClickPo = this.mouseClickPo;
            // debugger
            let { pageX, pageY } = e;
            let distX = pageX - mouseClickPo.mouseX;
            let distY = pageY - mouseClickPo.mouseY;
            mouseClickPo.lastMouseX = mouseClickPo.pageX;
            mouseClickPo.lastMouseY = mouseClickPo.pageY;
            this.mouseClickPo = Object.assign({}, mouseClickPo, { pageX, pageY, distX, distY });

            let limitRect = this.limitRect(this.mouseClickPo);
            if (limitRect.xable) {
                this.left = mouseClickPo.x + distX;
            }
            if (limitRect.yable) {
                this.top = mouseClickPo.y + distY;
            }
            this.$emit('dragging', this.left, this.top);
        },
        limitRect(mousePo) {
            let { pageX, pageY, lastMouseY } = mousePo;
            let xable = true,
                yable = true;
            let { minL, maxL, minT, maxT } = this.bounds;
            // left right
            if (pageX <= minL || pageX >= maxL) {
                xable = false;
            }
            // top bottom
            let dragRect = this.handleDragDom.getBoundingClientRect();
            let limitT = dragRect.top <= minT && (lastMouseY >= pageY || pageY <= minT + dragRect.height);
            if (limitT) {
                yable = false;
                if (pageY > minT + 10 && lastMouseY < pageY) {
                    yable = true;
                }
            } else {
                maxT = this.resizing ? maxT + this.handleDragDom.offsetHeight : maxT;
                yable = !(pageY >= maxT);
            }
            return { xable, yable };
        },
        up() {
            // console.log(e);
            if (this.resizing) {
                this.resizing = false;
                this.$emit('resizestop', this.left, this.top, this.width, this.height);
            }
            if (this.dragging) {
                this.dragging = false;
                this.$emit('dragstop', this.left, this.top);
            }
            this.$nextTick(() => {
                removeEvent(document.documentElement, 'mousemove', this.move);
                removeEvent(document.documentElement, 'mouseup', this.up);
            });
        },
        // 获取父级的尺寸
        getParentSize() {
            if (this.parent) {
                const style = window.getComputedStyle(this.$el.parentNode, null);
                this.parentWidth = parseInt(style.getPropertyValue('width'), 10);
                this.parentHeight = parseInt(style.getPropertyValue('height'), 10);
            }
        },
        initParams() {
            const screenWidth = document.body.clientWidth; // body当前宽度
            const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)
            this.bounds.maxL = screenWidth;
            this.bounds.maxT = screenHeight - this.handleDragDom.offsetHeight;

            if (this.parent) {
                this.getParentSize();
                this.maxWidth = this.parentWidth;
                this.maxHeight = this.parentHeight;
            } else {
                this.maxWidth = screenWidth;
                this.maxHeight = screenHeight;
            }
        }
    },
    created() {
        this.top = this.y;
        this.left = this.x;
        this.zIndex = this.z;

        this.width = this.w;
        this.height = this.h;
        this.minWidth = this.minW == 0 ? this.w : this.minW;
        this.minHeight = this.minH == 0 ? this.h : this.minH;
        this.maxWidth = this.maxW;
        this.maxHeight = this.maxH;

        this.dragable = this.initDragable;
        this.resizable = this.initResizable;
    },
    mounted() {
        //    debugger
        this.el = this.$el;
        if (this.handleDragClass) {
            this.handleDragDom = this.el.querySelector(this.handleDragClass);
        } else {
            this.handleDragDom = this.el;
        }
        this.initParams();
        if (this.left == -1) {
            const screenWidth = document.body.clientWidth; // body当前宽度
            const elWidth = this.el.getBoundingClientRect().width;
            this.left = (screenWidth - elWidth) / 2;
        }
        window.addEventListener('resize', this.initParams);

        addEvent(this.handleDragDom, 'mousedown', this.mousedown);

        // addEvent(window, 'resize', this.checkParentSize);

        // document.documentElement.addEventListener('mouseup', this.up);
        // document.documentElement.addEventListener('mousedown', this.mousedown);
        // document.documentElement.addEventListener('mousedown', this.mousedown);
        // this.handleDragDom.addEventListener('mousedown', this.mousedown);
        // document.documentElement.addEventListener('mousemove', this.move);
        // document.documentElement.addEventListener('mouseleave', this.up);

        // window.addEventListener('resize', ()=>{
        //     this.listWidth = listEl.clientWidth;
        //     this.listHeight = listEl.clientHeight;
        // })
    },
    beforeDestory() {
        // 注销挂在事件
        removeEvent(this.handleDragDom, 'mousedown', this.mousedown);
        removeEvent(document.documentElement, 'mousemove', this.move);
        removeEvent(document.documentElement, 'mouseup', this.up);

        window.removeEventListener('resize', this.initParams);
    }
};
