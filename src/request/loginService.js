import {
    store,
    types
} from '../store'
import apiPath from "./apiPath";
import request from "./request";
import utils from '../utils'


//用户授权获取微信信息
function getUserInfo(data) {
    store.commit(types.SET_LOGIN_INFO, {
        encryptedData: data.encryptedData,
        iv: data.iv,
        rawData: data.rawData,
        signature: data.signature
    });
}
//登录
function login(phone, captcha, fn) {
    wx.login({
        success: (loginRes) => {
            if (loginRes.code) {
                /**
                 * 服务器登录接口
                 * phone 手机号
                 * captcha 验证码
                 * code 临时登录凭证
                 * rawData 用户非敏感信息
                 * signature 签名
                 * encryptedData 用户敏感信息
                 * iv 解密算法的向量
                 */
                wx.request({
                    url: apiPath.login,
                    method: 'post',
                    data: {
                        phone: phone,
                        captcha: captcha,
                        code: loginRes.code,
                        rawData: store.state.loginInfo.rawData,
                        signature: store.state.loginInfo.signature,
                        encryptedData: store.state.loginInfo.encryptedData,
                        iv: store.state.loginInfo.iv
                    },
                    success: (res) => {
                        utils.showToast('登录成功');
                        store.commit(types.SET_USER_INFO, {
                            name: res.name,
                            phone: res.phone,
                            icon: res.icon,
                            id: res.id
                        });
                        store.commit(types.SET_IS_LOGIN, true);
                        fn()
                    },
                    fail: (err) => {
                        utils.showToast('登录失败1');
                    }
                })

            } else {
                utils.showToast('登录失败2');
            }
        },
        fail: (err) => {
            utils.showToast('登录失败3');
        }
    })
}


//获取验证码
function getCaptcha(phone, fn) {
    request.get(apiPath.getCaptcha, {
        phone: phone
    }).then(res => {
        fn()
    });
}

export default {
    getUserInfo,
    getCaptcha,
    login,
}