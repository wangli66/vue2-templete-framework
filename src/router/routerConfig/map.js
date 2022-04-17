const map = [{
    path: '/map/leaflet',
    name: '/map/leaflet',
    redirect: '/map/leaflet/draw',
    component: () => import('../../views/main/map/leaflet/leaflet.vue'),
    meta: {
        name: 'leaflet',
    },
    children: [{
        path: '/map/leaflet/baseLayer',
        name: '/map/leaflet/baseLayer',
        component: () => import('../../views/main/map/leaflet/baseLayer/baseLayer.vue'),
        meta: {
            name: '底图组件',
        },
    }, {
        path: '/map/leaflet/draw',
        name: '/map/leaflet/draw',
        component: () => import('../../views/main/map/leaflet/draw/draw.vue'),
        meta: {
            name: '画图',
        },
    }, {
        path: '/map/leaflet/geoJson',
        name: '/map/leaflet/geoJson',
        component: () => import('../../views/main/map/leaflet/geoJson/geoJson.vue'),
        meta: {
            name: 'geoJson',
        },
    }, {
        path: '/map/leaflet/baseLayerChange',
        name: '/map/leaflet/baseLayerChange',
        component: () => import('../../views/main/map/leaflet/baseLayerChange/baseLayerChange.vue'),
        meta: {
            name: '底图切换',
            noMenu: true,
        },
    }, {
        path: '/map/leaflet/geoJsonMultiple',
        name: '/map/leaflet/geoJsonMultiple',
        component: () => import('../../views/main/map/leaflet/geoJsonMultiple/geoJsonMultiple.vue'),
        meta: {
            name: 'geoJson组件',
            noMenu: true,
        },
    }, {
        path: '/map/leaflet/sideBySide',
        name: '/map/leaflet/sideBySide',
        component: () => import('../../views/main/map/leaflet/sideBySide/sideBySide.vue'),
        meta: {
            name: 'sideBySide',
        },
    }]
}, {
    path: '/map/openlayers',
    name: '/map/openlayers',
    redirect: '/map/openlayers/draw',
    component: () => import('../../views/main/map/openlayers/openlayers.vue'),
    meta: {
        name: 'openlayers',
    },
    children: [{
        path: '/map/openlayers/draw',
        name: '/map/openlayers/draw',
        component: () => import('../../views/main/map/openlayers/draw/draw.vue'),
        meta: {
            name: '画图',
        },
    }]
}];
export default map;