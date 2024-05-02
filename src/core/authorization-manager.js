let authMap = null;

function setAuthMap(obj) {
    authMap = obj
}

function getAuthMap() {
    if(authMap == null || authMap == undefined){
        return false;
    }

    return authMap;
}

function checkEntityAuth(entity) {
    let am = getAuthMap()
    if(am.entities[entity]) {
        if(am.entities[entity].view && am.entities[entity].view !== false) {
            return am.entities[entity].view
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

function checkActionAuth(action) {
    return true
}

function checkEntityActionAuth(entity, action) {
    let am = getAuthMap()
    if(am.entities[entity]) {
        if(am.entities[entity][action] !== false) {
            return am.entities[entity][action]
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

export const AuthorizationManager = {
    getAuthMap: getAuthMap,
    setAuthMap: setAuthMap,
    checkEntityAuth: checkEntityAuth,
    checkActionAuth: checkActionAuth,
    checkEntityActionAuth: checkEntityActionAuth
};