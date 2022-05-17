export default {
    data() {
        return {
            name: 'test',
            tinyArr: [],
            subArr: [],
            mainArr: [],
            scale: 10
        };
    },
    methods: {
        handleZoom(type) {
            this.scale += type == 'zoomIn' ? 1 : -1;
            this.initRender();
        },
        initRender() {
            let scale = this.scale;
            this.tinyArr = [];
            for (let i = 0; i < 1000; i = i + scale) {
                this.tinyArr.push({ left: i });
            }
            this.subArr = [];
            for (let i = 0; i < 1000; i = i + scale * 5) {
                this.subArr.push({ left: i });
            }
            this.mainArr = [];
            for (let i = 0; i < 1000; i = i + scale * 5 * 3) {
                this.mainArr.push({ left: i });
            }
        }
    },
    mounted() {
        this.initRender();
    }
};
