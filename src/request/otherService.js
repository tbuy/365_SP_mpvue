import {
    store,
    types
} from '../store'
import apiPath from "./apiPath";
import request from "./request";
import utils from '../utils'
import config from '../config'
import area from '../../static/json/area'


//获取视频列表
function getVideoList(lastId, pageNumber) {
    return request.get(apiPath.getVideoList, {
        lastId: lastId,
        pageNumber: pageNumber
    });
}

//获取单个视频
function getVideo(id) {
    return request.get(apiPath.getVideo, {
        id: id,
    });
}
//获取订单列表
function getOrderList(lastId, pageNumber) {
    return request.get(apiPath.getOrderList, {
        lastId: lastId,
        pageNumber: pageNumber
    });
}

//获取单个订单信息 
function getOrder(id) {
    return request.get(apiPath.getOrder, {
        id: id,
    });
}

//广告位
function getAdPosition() {
    return request.get(apiPath.getAdPosition).then(res => {
        store.commit(types.SET_AD, res);
        return res
    });
}
//电话
function makePhoneCall(phone) {
    wx.makePhoneCall({
        phoneNumber: phone || config.phone
    });
}

export default {
    getVideoList,
    getVideo,
    getOrderList,
    getOrder,
    getAdPosition,
    makePhoneCall,
}