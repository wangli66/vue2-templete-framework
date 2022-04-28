import stringify from 'qs/lib/stringify';
import download from './download';

export {
    download // 附件下载
};

/**
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */
export const qsStringify = function (data, options) {
    options = { arrayFormat: 'repeat', ...options };
    return stringify(data, options);
};

/**
 * 将对象转成 formData
 * @param {{[key: string]: Val | Val[]}} data
 * @param {'repeat' | 'brackets' | 'indices'} [arrayFormat]
 */
export const toFormData = function (data, arrayFormat = 'repeat') {
    if (data instanceof FormData) return data;
    const formData = new FormData();
    _.each(data, (val, key) => {
        if (val === undefined) return;
        if (Array.isArray(val)) {
            val = val.filter(v => v !== undefined);
            val.forEach((v, i) => {
                let k = key;
                if (arrayFormat === 'brackets') k += '[]';
                else if (arrayFormat === 'indices') k += `[${i}]`;
                formData.append(k, v === null ? '' : v);
            });
        } else {
            formData.append(key, val === null ? '' : val);
        }
    });
    return formData;
};

/**
 * 格式化时间
 * 调用 dateFormat('yyyy-MM-dd hh:mm:ss')
 * @param {*} fmt 格式
 * @param {*} date 时间戳
 * @returns
 */
export const dateFormat = function (fmt, date) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

/**
 * 生成uuid
 * @returns
 */
export const uuid = function () {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    var uuid = s.join('');
    return uuid;
};
