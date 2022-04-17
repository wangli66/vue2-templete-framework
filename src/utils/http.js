import { dateFormat } from '@/utils/util.js';
import axios from 'axios';
import Vue from 'vue';
import { storage } from './storage.js'; //前端本地存储封装方法

// import { Loading } from 'element-ui';
import { Message } from 'element-ui';

axios.defaults.timeout = 600000;

// const baseURL = '/devServer';

// 发送请求的时候遮罩
// let loadingInstance = Loading.service({
//     lock: true,
//     text: 'Loading',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.7)'
// });
// 请求返回的遮罩消失
// loadingInstance.close();

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // debugger
        // 当对应的后台为多个不同服务时，需配置baseURL;
        // config.baseURL = config.baseURL === undefined ? baseURL : config.baseURL;

        // get请求
        // 如果没有设置headers的contentType,则默认这种格式
        if (!config.headers) {
            config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }
        if (config.method == 'get' && config.params) {
            // Object.keys(config.params).forEach(item => {
            //     let itemValue = config.params[item];
            //     config.params[item] = itemValue;
            // });
        }

        // post值存在时，data有值
        config.transformRequest[0] = function (data) {
            // multiple/form-data格式的
            if (data && typeof data.get === 'function') {
                return data;
            }
            if (data) {
                // debugger
                // post请求，参数为body,格式为application/json;
                if (config.headers['Content-Type'] && config.headers['Content-Type'].includes('application/json')) {
                    return JSON.stringify(data);
                }
                // config.headers.post = { 'Content-Type': 'application/json;', 'Accept': '*/*' };
                // post请求为：application/x-www-form-urlencoded
                let res = [];
                for (let it in data) {
                    // 标准的处理方法应为注释的这行；
                    // res.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]));
                    res.push(it + '=' + data[it]);
                }
                return res.join('&');
            }
            // data = Qs.stringify(data);
            return data;
        };
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        // 此处统一处理返回值
        return response.data;
    },
    error => {
        let response = error.response;
        let msg = (response.data && response.data.message) || error.response.statusText;
        Message({
            type: 'error',
            showClose: true,
            message: msg
        });
        return Promise.reject(msg);
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const get = (url, params = {}, otherParams = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
                ...otherParams
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
};
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const post = (url, data = {}, otherParams = {}) => {
    return new Promise((resolve, reject) => {
        // axios.post(url, data).then(
        axios({
            method: 'post',
            url,
            data: data,
            ...otherParams
        }).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
};

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const deleteRequest = (url, data = {}, otherParams = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url,
            data: data,
            ...otherParams
        }).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
};

// 抛出常用方法
// Vue.prototype.$baseURL = baseURL;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$delete = deleteRequest;
Vue.prototype.$axios = axios;

export { get, post, deleteRequest };
