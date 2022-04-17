export const dealMenuData = {
    methods: {
        forEachMenu(routeList, menuList) {
            (routeList || []).forEach(item => {
                if (item.meta && !item.meta.noMenu) {
                    let isExistIndex = menuList.findIndex(menu => menu.path == item.path);
                    if (isExistIndex < 0) {
                        item.component = undefined;
                        menuList.push({ ...item, ...item.meta, ...{ children: null } });
                    } else {
                        let obj = menuList[isExistIndex];
                        obj.component = undefined;
                        menuList[isExistIndex] = { ...obj, ...obj.meta, ...{ children: null } };
                    }
                    if (item.children && item.children.length > 0) {
                        isExistIndex = menuList.findIndex(menu => menu.path == item.path);
                        menuList[isExistIndex].children = [];
                        this.forEachMenu(item.children, menuList[isExistIndex].children);
                    }
                }
            });
        }
    }
};
