/**
 * 这里的配置项及拦截器通常和业务相关
 */
import _, { method } from 'lodash';
import createAxios from './createAxios';
import { Message } from 'element-ui';

/**
 * 发送前拦截
 * @param {Parameters<createAxios>[0]} config
 */
const requestHandle = config => {
    // 设置 默认Content-Type
    if (!config.headers) {
        config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    // 向服务器发送前，修改请求数据
    config.transformRequest[0] = function (data) {
        // 处理post请求，使其参数在控制台的payload中可视
        if (data) {
            // post请求，参数为body,格式为application/json;
            if (config.headers['Content-Type'] && config.headers['Content-Type'].includes('application/json')) {
                return typeof data === 'string' ? data : JSON.stringify(data);
            }
            // config.headers.post = { 'Content-Type': 'application/json;', 'Accept': '*/*' };
            // post请求为：application/x-www-form-urlencoded
            let res = [];
            for (let it in data) {
                res.push(it + '=' + data[it]);
            }
            return res.join('&');
        }
        return data;
    };
    return config;
};

/* 发送失败拦截 */
const requestErrHandle = err => {
    throw err;
};

/**
 * 响应成功拦截
 * @param {import('axios').AxiosResponse} res
 */
const responseHandle = res => {
    const { code, msg } = res.data || {};
    // 200 类成功 - 一般请求
    if (code === 200) {
        return res.data;
    }
    // 200 类成功 - 请求二进制文件
    else if (/^(arraybuffer|blob|stream)$/.test(_.get(res.request, 'responseType'))) {
        return res;
    }
    // 200 类失败
    else {
        let message = `${msg || '系统错误'}`;
        if (code) {
            message = `${code} :: ${message}`;
        }
        if (!res.config.exNoErrorMassage) {
            // window.console.error(message);
            // 弹出错误信息
            Message({ type: 'error', showClose: true, message: message });
        }
        const err = new Error(message);
        err['exRes'] = res;
        throw err;
    }
};

/* 响应失败拦截 */
const responseErrHandle = err => {
    // 非 200 类失败 (有响应 & 响应体解析后是 json 对象)
    if (err.response && _.isPlainObject(err.response.data)) {
        if (!_.get(err.config, 'exNoErrorMassage')) {
            const code = _.get(err.response.data, 'code');
            let message = _.get(err.response.data, 'msg') || '系统错误';
            if (code) {
                message = `${code} :: ${message}`;
            }
            // window.console.error(message);
            Message({ type: 'error', showClose: true, message: message });
        }
    }
    throw err;
};

/* 抛出http请求 */
export const http = createAxios(
    {
        baseURL: process.env.VUE_APP_BASEURL_API || '/devServer',
        timeout: 3000
    },
    instance => {
        instance.interceptors.request.use(requestHandle, requestErrHandle);
        instance.interceptors.response.use(responseHandle, responseErrHandle);
    }
);

export default http;

/**
 * 封装 常用的请求methods，并抛出
 */
export const methodsList = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch'];
const methodsMap = {};
const requestMethod = (method, url, data = {}, config = {}) => {
    if (['delete', 'get', 'head', 'options'].includes(method)) {
        return http[method](url, {
            params: data,
            ...config
        });
    } else if (['post', 'put', 'patch'].includes(method)) {
        return http[method](url, data, {
            ...config
        });
    }
};

methodsList.forEach(method => {
    methodsMap[method] = (url, data, config) => {
        return requestMethod(method, url, data, config);
    };
});

export const get = methodsMap['get'];
export const deleteRequest = methodsMap['delete'];
export const head = methodsMap['head'];
export const options = methodsMap['options'];

export const post = methodsMap['post'];
export const put = methodsMap['put'];
export const patch = methodsMap['patch'];
