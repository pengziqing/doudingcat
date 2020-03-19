import request from '../utils/request'

export function activityRule(params) {
    return request({
        url: `qdh-cloud-web/api/json/zxjHorizonApi/getHorizonList`,
        method: 'post',
        data: params
    })
};
export function getConfiguration(params) {
    return request({
        url: `qdh-cloud-web/api/json/commonApi/getConfiguration`,
        method: 'post',
        data: params
    })
};
export function createHorizon(params) {
    return request({
        url: `qdh-cloud-web/api/json/zxjHorizonApi/createHorizon`,
        method: 'post',
        data: params
    })
};
export function deleteHorizon(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjHorizonApi/deleteHorizon`,
        method: 'post',
        data: params
    })
};
export function getAppList(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/getAppList`,
        method: 'post',
        data: params
    })
};
export function createApp(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/createApp`,
        method: 'post',
        data: params
    })
};
export function updateApp(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/updateApp`,
        method: 'post',
        data: params
    })
};
export function deleteapp(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/deleteApp`,
        method: 'post',
        data: params
    })
};
export function getAppListByProjectId(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/getAppListByProjectId`,
        method: 'post',
        data: params
    })
};
export function releaseApp(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/releaseApp`,
        method: 'post',
        data: params
    })
};
export function showHiddenApp(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjAppManagerApi/showHiddenApp`,
        method: 'post',
        data: params
    })
};
export function updateHorizon(params) {
    return request({
        url: `/qdh-cloud-web/api/json/zxjHorizonApi/updateHorizon`,
        method: 'post',
        data: params
    })
};;
export function getAuthUserDetai(params) {
    return request({
        url: `/qdh-cloud-web/api/json/authUserApi/getAuthUserDetail`,
        method: 'post',
        data: params
    })
};







