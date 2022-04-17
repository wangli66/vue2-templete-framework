import addEvent from './scrollEvent.js';

export default {
    props: {
        src: {
            type: String,
            default: '/test.png'
        },
        selfStyle: {
            default() {
                return {
                    width: '100%',
                    height: '300px',
                    border: '1px solid #ccc',
                    margin: '0 auto'
                };
            }
        },
        zoomMax: {
            default: 3
        },
        zoomMin: {
            default: 0.2
        }
    },
    data() {
        return {
            showOperate: true,
            // 图片的操作
            fullType: false, //false->全高； true->宽即全屏
            zoomNum: 1,
            // zoomMin: 0.2,
            // zoomMax: 2,

            maxHeight: null,
            left: 0,
            top: 0,
            el: null,
            dragging: false,
            mouseClickPo: null,
            startObj: null
        };
    },
    watch: {
        src(newVal) {
            if (newVal) {
                this.initOperate(true);
            }
        }
    },
    computed: {
        fullName() {
            return this.fullType ? '全屏' : '初始';
        },
        imgW() {
            let w = '';
            if (this.fullType) {
                w = '100%';
            }
            return w;
        },
        imgH() {
            return this.fullType ? '' : this.maxHeight + 'px';
        }
    },
    methods: {
        handFullScreen() {
            this.fullType = !this.fullType;
            this.initOperate();
        },
        handZoomIn() {
            this.zoomFn('plus');
        },
        handZoomOut() {
            this.zoomFn('reduce');
        },
        zoomFn(type) {
            // debugger
            let zoom = this.zoomNum;
            if (type == 'plus') {
                zoom += 0.1;
                zoom = zoom > this.zoomMax ? this.zoomMax : zoom;
            } else if (type == 'reduce') {
                zoom -= 0.1;
                zoom = zoom < this.zoomMin ? this.zoomMin : zoom;
            }
            this.zoomNum = zoom;
        },
        initOperate(init) {
            if (init == true) {
                this.fullType = false;
            }
            this.left = 0;
            this.top = 0;
            this.zoomNum = 1;
        },
        initHeight() {
            // debugger
            // this.maxHeight = window.innerHeight - 210;
            this.maxHeight = this.$refs.imageContainer.offsetHeight;
            if (!this.maxHeight) {
                setTimeout(() => {
                    this.initHeight();
                }, 800);
            }
        },
        // 拖拽
        setMouseClickPo(e) {
            let rect = e.target.getBoundingClientRect();
            console.log('rec--------', rect);
            let { pageX, pageY } = e;
            this.mouseClickPo = {
                mouseX: pageX,
                mouseY: pageY,
                xL: rect.left,
                xR: rect.right,
                yT: rect.top,
                yB: rect.bottom,
                left: this.left,
                top: this.top
            };
        },
        mousedown(e) {
            if (e.stopPropagation) e.stopPropagation();
            this.dragging = true;
            this.startObj = this.el.getBoundingClientRect();
            this.setMouseClickPo(e);
            document.documentElement.addEventListener('mousemove', this.move);
            document.documentElement.addEventListener('mouseup', this.up);
        },
        move(e) {
            if (this.dragging) {
                // debugger
                let poObj = this.mouseClickPo;
                let startObj = this.startObj;
                let { pageX, pageY } = e;
                console.log(pageX, pageY);
                if (pageX <= startObj.right && pageX >= startObj.left) {
                    this.left = poObj.left + (pageX - poObj.mouseX);
                }
                if (pageY >= startObj.top && pageY <= startObj.bottom) {
                    this.top = poObj.top + (pageY - poObj.mouseY);
                }
            }
        },
        up(e) {
            this.dragging = false;
            document.documentElement.removeEventListener('mousemove', this.move);
            document.documentElement.removeEventListener('mouseup', this.up);
        },
        handleLoad(e) {
            this.showOperate = true;
        },
        handleError(e) {
            this.showOperate = false;
        }
    },
    mounted() {
        this.initHeight();
        window.addEventListener('resize', this.initHeight);

        let _this = this;
        addEvent(this.$refs.imageContainer, 'mousewheel', function (event) {
            if (event.delta < 0) {
                console.log('鼠标向上滚了！');
                _this.handZoomIn();
            } else {
                console.log('鼠标向下滚了！');
                _this.handZoomOut();
            }
        });

        let imageCon = this.$refs.imageContainer;
        if (imageCon) {
            this.el = imageCon;
            this.startObj = this.el.getBoundingClientRect();
            imageCon.addEventListener('mousedown', this.mousedown, false);
        }

        // addEvent(document.documentElement, 'mousemove', this.move);
        // addEvent(document.documentElement, 'mouseup', this.up);
    },
    beforeDestory() {
        window.removeEventListener('resize', this.initHeight);
    }
};
