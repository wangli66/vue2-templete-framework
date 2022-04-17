const cityOptions = ['上海', '北京', '广州', '深圳'];
const test = [
    {
        name: '上海',
        id: 'aaa'
    },
    {
        name: '北京',
        id: 'bbb'
    }
];
export default {
    props: {
        value: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            checkAll: false,
            checkedArr: [],
            // cities: cityOptions,
            allCheckData: [],
            isIndeterminate: true
        };
    },
    methods: {
        handleCheckAllChange(val) {
            // console.log(val);
            this.checkedArr = val ? this.allCheckData : [];
            this.isIndeterminate = false;
            this.value.forEach((item, index) => {
                if (!item.disabled) {
                    this.value[index].hidden = !val;
                    this.$set(this.value, index, this.value[index]);
                }
            });
        },
        handleCheckedChange(value) {
            // console.log(value);
            // console.log(this.value);
            // debugger
            this.value.forEach((item, index) => {
                // console.log(!value.includes(item.prop));
                this.value[index].hidden = !value.includes(item.prop);
                this.$set(this.value, index, this.value[index]);
            });
            // console.log(this.value);

            let checkedCount = value.length;
            this.checkAll = checkedCount === this.allCheckData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allCheckData.length;
        }
    },
    mounted() {
        // console.log('---tableColumns---', this.value);
        this.allCheckData = [];
        this.value.forEach(item => {
            this.allCheckData.push(item.prop);
            if (!item.hidden) {
                this.checkedArr.push(item.prop);
            }
        });
        let checkedCount = this.checkedArr.length;
        this.checkAll = checkedCount === this.allCheckData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allCheckData.length;
    }
};
