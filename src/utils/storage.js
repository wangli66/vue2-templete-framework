import Vue from 'vue';
/**
 * 包装storage功能
 * @param {'l'|'s'} st 存储类型 localStorage|sessionStorage
 * @param {*} key 存储数据的变量
 * @param {*} value 存储的值
 * @param {*} expires 存储保存的时间
 * @returns
 */
const storageFn = function (st, key, value, expires) {
    if (st == 'l') {
        st = window.localStorage;
        expires = expires || 60 * 24; //一天
    } else {
        st = window.sessionStorage;
        expires = expires || 60 * 24; //一个小时  先都设置为一天吧，此部分后期要优化
    }
    if (typeof value != 'undefined') {
        //设置
        try {
            return st.setItem(
                key,
                JSON.stringify({
                    data: value,
                    expires: new Date().getTime() + expires * 1000 * 60
                })
            );
        } catch (e) {
            console.error(`设置${key}失败`);
        }
    } else {
        //获取
        var result = JSON.parse(st.getItem(key) || '{}');
        // 如果key存在，  没有设置超期，            或者是没有超期
        if (result && (!expires || new Date().getTime() < result.expires)) {
            return result.data;
        } else {
            st.removeItem(key);
            return null;
        }
    }
};

/**
 * params ->  {key: '', value: '', expires:'超期时间'}
 */
const storage = {
    // localStorageSet(params) {
    setL(params) {
        storageFn('l', params.key, params.value, params.expires);
    },
    // localStorageGet(params) {
    getL(params) {
        let key = params.key;
        let value = params.value;
        if (typeof params == 'string') {
            key = params;
            value = undefined;
        }
        // return storageFn('l', params.key, params.value, params.expires);
        return storageFn('l', key, value);
    },
    clearL(key) {
        if (key) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.clear();
        }
    },
    // sessionStorageSet(params) {
    setS(params) {
        storageFn('s', params.key, params.value, params.expires);
    },
    // sessionStorageGet(params) {
    getS(params) {
        let key = params.key;
        let value = params.value;
        if (typeof params == 'string') {
            key = params;
            value = undefined;
        }
        return storageFn('s', key, value);
        // return storageFn('s', params.key, params.value, params.expires);
    },
    // 如果key有值，删除key对应的value,
    // 否则，清除所有
    clearS(key) {
        if (key) {
            window.sessionStorage.removeItem(key);
        } else {
            window.sessionStorage.clear();
        }
    }
};

Vue.prototype.$storage = storage;

export { storage };
