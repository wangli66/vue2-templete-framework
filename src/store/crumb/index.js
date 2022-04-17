const crumb = {
    namespaced: true,
    state: {
        // {name: '', path: '', query: ''}
        crumbData: [], //当前面包屑
        lastCrumbData: [] //上一次的面包屑
    },
    mutations: {
        getCrumbRoute(state, params) {
            if (params && params.length > 0) {
                let lastPath = params.pop(); //当前的路由
                let isClickCrumb = false; //是否是在当前面包屑中点击路由跳转
                let clickCrumbIndex = 0;

                state.crumbData.forEach((item, index) => {
                    if (item.path === lastPath.path && item.name === lastPath.name) {
                        isClickCrumb = true;
                        clickCrumbIndex = index;
                    }
                });

                if (isClickCrumb) {
                    state.crumbData = state.crumbData.splice(0, clickCrumbIndex + 1);
                } else {
                    params.forEach(item => {
                        state.crumbData.forEach(subItem => {
                            if (subItem.path === item.path && subItem.name === item.name) {
                                item.query = subItem.query;
                                item.name = subItem.name;
                                item.noCrumb = subItem.noCrumb;
                                item.noCrumbLink = subItem.noCrumbLink;
                            }
                        });
                    });
                    params.push(lastPath);
                    state.crumbData = [].concat(params);
                }
            }
        },
        // 设置crumbList,由外部控制面包屑的内容
        setCrumbList(state, crumbData) {
            state.crumbData = [].concat(crumbData);
        },
        setLastCrumbData(state, crumbData) {
            state.lastCrumbData = [].concat(crumbData);
        },
        addOneCrumb(state, params) {
            state.crumbData.push(params);
        },
        changeCrumbLastName(state, name) {
            state.crumbData[state.crumbData.length - 1].name = name;
        },
        /**
         * 修改某一项的面包屑参数
         * @param {*} params  string  修改最后一个面包屑的显示名称
         *                      obj {index: '', name: ''}  修改某一项的名字
         */
        changeCrumbName(state, params) {
            let index = state.crumbData.length - 1;
            if (typeof params === 'string') {
                state.crumbData[index].name = params;
            } else {
                index = params.index ? params.index : index;
                state.crumbData[index].name = params.name;
            }
        }
    }
};

export default crumb;
