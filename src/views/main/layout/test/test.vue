<template>
    <div>这是一个在layout里面的test界面</div>
</template>
<script>
import { http } from '@/utils/http/index.js';
export default {
    data() {
        return {};
    },
    methods: {
        async getData() {
            // debugger;
            // let a = await http.get('/rsmis-upms2-service/user/selectLoginInfo', { exShowLoading: true, exCancel: true });
            let b = await this.$get(
                '/rsmis-upms2-service/user/selectLoginInfo?test=111',
                {
                    nCurrent: 1,
                    nSize: 15,
                    orderType: 1,
                    cc: [1, 3]
                },
                { exShowLoading: true, exCancel: true }
            );
            // let c = await http.post(
            //     '/rsmis-sample-info-service/sampleTileServer/queryTileSampleResultList',
            //     {
            //         nCurrent: 1,
            //         nSize: 15,
            //         orderType: 1
            //     },
            //     {
            //         headers: {
            //             token: '89c77de9-dc60-4f1e-8ce3-888d283d1e29'
            //         }
            //     }
            // );
            // debugger;
        }
    },
    mounted() {
        this.getData();
        // let b = http.post('/rsmis-upms2-service/user/selectLoginInfo', { a: 1 }, { responseType: 'blob' });
        // debugger;
    }
};
</script>
