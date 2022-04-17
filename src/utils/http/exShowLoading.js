import { Loading } from 'element-ui';

let instance = null; // 单例模式
let count = 0;

/**
 * @type {import('axios').AxiosInstance['exHooks'][0]}
 */
export const exShowLoading = Object.freeze({
    onBefore(config) {
        if (config.exShowLoading) {
            if (!instance || instance.visible === false) {
                instance = Loading.service();
            }
            count++;
            config._exShowLoading = true;
        }
    },
    onComplete(config) {
        if (config._exShowLoading) {
            if (instance) {
                count--;
                if (count <= 0) {
                    instance.close();
                    instance = null;
                    count = 0;
                }
            }
        }
    }
});

export default exShowLoading;
