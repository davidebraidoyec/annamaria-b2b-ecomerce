import { Utils } from './utils';
import { ApiManager } from './api-manager';
import { AuthorizationManager } from './authorization-manager';
import { ViewManager } from './view-manager';


let data = {
    sid:null,
    userInfo:null
}

var refreshing = false;

var changedSidHandlers = {};

var callSidChangedHandlers = function () {
    for (var id in changedSidHandlers) {
        changedSidHandlers[id]()
    }
}

var registerChangeSid = function (handler) {
    var id = Date.now()
    changedSidHandlers[id] = handler;
    return id;
}


async function refreshSid(action = null, body = null) {
    if(refreshing === true) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(ApiManager.sendAuthenticatedRequest(action, body));
            }, 200);
        });
    }
    else {
        refreshing = true;
        let ltsid = await getLtsid();
        let b = {
            ltsid: ltsid
        }
        let response = await ApiManager.sendRequest('/auth/refreshSid', b)
        if(response.success === 1) {
            data.sid = response.sid;
            data.userInfo = response.body;
            localStorage.setItem('ltsid', response.ltsid);
            localStorage.setItem('userInfo', JSON.stringify(response.body));
    
            AuthorizationManager.setAuthMap(response.auth_map);
            ViewManager.setProperties(response.props)
            
            setTimeout(function(){
                refreshing = false;
            }, 2000);

            if(action && body) {
                return ApiManager.sendAuthenticatedRequest(action, body)
            }
            else {
                return true
            }
        }
        else {
            refreshing = false;
            return afterLogoutActions()
        }
    }
}

async function login(username, password, rememberme) {
    let body = {
        rememberme: rememberme,
        password: Utils.encrypt(password),
        username: username
    }
    let response = await ApiManager.sendRequest('/auth/login', body)
    if(response.success === 1) {
        afterLoginActions(response)
    }

    return response;
}

async function checkLogin() {
    let ltsid = await getLtsid();
    let body = {
        ltsid: ltsid
    }
    let response = await ApiManager.sendRequest('/auth/checkLogin', body)
    if(response.success === 1) {
        data.sid = response.sid;
        data.userInfo = response.body;
        localStorage.setItem('ltsid', response.ltsid);
        localStorage.setItem('userInfo', JSON.stringify(response.body));

        AuthorizationManager.setAuthMap(response.auth_map);
        ViewManager.setProperties(response.props)
        return true
    }
    else {
        return false;
    }
}

async function logout() {
    let ltsid = await getLtsid();
    let body = {
        ltsid: ltsid
    }
    let response = await ApiManager.sendRequest('/auth/logout', body)
    console.log('logout', response)
    afterLogoutActions()
    return true
}

async function afterLoginActions(rawData) {
    data.sid = rawData.sid;
    data.userInfo = rawData.body;
    localStorage.setItem('ltsid', rawData.ltsid);
    localStorage.setItem('userInfo', JSON.stringify(rawData.body));

    AuthorizationManager.setAuthMap(rawData.auth_map);
    ViewManager.setProperties(rawData.props)

    callSidChangedHandlers()

    return true;
}

async function afterLogoutActions(){
    data.sid = null;
    data.userInfo = null;
    localStorage.clear()

    callSidChangedHandlers()

    return true;
}

function getUserInfo() {
    return data.userInfo;
}

async function getSid() {
    return data.sid;
}

async function getLtsid() {
    let ltsid = localStorage.getItem('ltsid');

    console.log("LoginManager (getLtsid): ltsid is: " + ltsid)
    return ltsid;
}

async function changePassword(password, newPassword, confirmPassword) {
    let body = {
        password: Utils.encrypt(password),
        newPassword: Utils.encrypt(newPassword),
        confirmPassword: Utils.encrypt(confirmPassword),
    }
    let response = await ApiManager.sendAuthenticatedRequest('/account/updatePassword', body)
    return response;
}

async function updateProfile(body) {
    let response = await ApiManager.sendAuthenticatedRequest('/account/updateProfile', body)
    return response;
}

async function recoverPassword(username) {
    let body = {
        email: username
    }
    let response = await ApiManager.sendRequest('/auth/forgot', body)
    return response;
}

async function resetPassword(pin, newPassword, confirmPassword) {
    let body = {
        pin: pin,
        newPassword: Utils.encrypt(newPassword),
        confirmPassword: Utils.encrypt(confirmPassword),
    }
    let response = await ApiManager.sendRequest('/auth/reset', body)
    return response;
}



export const LoginManager = {
    login: login,
    refreshSid: refreshSid,
    checkLogin: checkLogin,
    logout: logout,
    getUserInfo: getUserInfo,
    getSid: getSid,
    getLtsid: getLtsid,
    registerChangeSid: registerChangeSid,
    changePassword: changePassword,
    recoverPassword: recoverPassword,
    resetPassword: resetPassword,
    updateProfile: updateProfile,
    afterLoginActions: afterLoginActions
};