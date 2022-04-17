// 这里注册的是全局组件，会在项目中多处使用的
// 如果仅一处使用的组件，请在使用时引入
import breadCrumb from './breadCrumb/breadCrumb.vue';
import selfTable from './selfTable/selfTable.vue';

// 以数组的结构保存组件，便于遍历
const components = [breadCrumb, selfTable];

const globalComp = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

export default globalComp;
