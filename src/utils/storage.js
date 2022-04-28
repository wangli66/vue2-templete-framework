import Vue from 'vue'
// 封装前端的存储
const storageFn = function(st, key, value, expires) {
    if (st == 'l') {
        st = window.localStorage;
        expires = expires || (60 * 24); //一天
    } else {
        st = window.sessionStorage;
        expires = expires || (60 * 24); //一个小时  先都设置为一天吧，此部分后期要优化
    }
    if (typeof value != 'undefined') { //设置
        try {
            return st.setItem(key, JSON.stringify({
                data: value,
                expires: new Date().getTime() + expires * 1000 * 60
            }));
        } catch (e) {}
    } else { //获取
        var result = JSON.parse(st.getItem(key) || '{}');
        // 如果key存在，  没有设置超期，            或者是没有超期
        if (result && (!expires || (new Date().getTime() < result.expires))) {
            return result.data;
        } else {
            st.removeItem(key);
            return null;
        }
    }
}

/**
 * 设置存储值
 * @param {'s'|'l'} type
 * @param {Object={key:'',value:'',expires:''}|string=''} keyParams
 * @param {*} value
 * @param {*} expires
 */
const setValue = function(type, keyParams, value, expires){
    let key = '';
    if (typeof keyParams == 'object') {
        key = params.key;
        value = params.key;
        expires = params.expires;
    }else{
        key = keyParams;
    }
    storageFn(type, key, value, expires);
}

/**
 * 获取存储的值
 * @param {'s'|'l'} type
 * @param {object={key:''}|string=''} params
 * @returns
 */
const getVal = function(type, params){
    let key = params.key;
    let value = params.value;
    if (typeof params == 'string') {
        key = params;
        value = undefined;
    }
    return storageFn(type, key, value);
}


/**
 * keyParams ->  {key: '', value: '', expires:'超期时间'} || keyString:''
 */
export const storage = {
    setL(keyParams,value,expires) {
        setValue('l', keyParams, value, expires);
    },
    getL(params) {
        getVal('l',params);
    },
    clearL(key) {
        if (key) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.clear();
        }
    },
    setS(keyParams,value,expires) {
        setValue('s', keyParams, value, expires);
    },
    getS(params) {
        getVal('s',params);
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

Vue.prototype.$storage = storage