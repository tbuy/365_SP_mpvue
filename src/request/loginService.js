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
function login(phone, captcha) {
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
                request.post(apiPath.login, {
                    phone: phone,
                    captcha: captcha,
                    code: loginRes.code,
                    rawData: store.state.loginInfo.rawData,
                    signature: store.state.loginInfo.signature,
                    encryptedData: store.state.loginInfo.encryptedData,
                    iv: store.state.loginInfo.iv
                }).then(res => {
                    if (res.id) {
                        store.commit(types.SET_USER_INFO, {
                            name: res.name,
                            phone: res.phone,
                            icon: res.icon,
                            id: res.id
                        });
                        store.commit(types.SET_IS_LOGIN, true);
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

function logout() {
    store.commit(types.SET_USER_INFO, {});
    store.commit(types.SET_IS_LOGIN, false);
    store.commit(types.SET_LOGIN_INFO, {});
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
    logout
}