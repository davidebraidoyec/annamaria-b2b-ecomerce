import { ApiManager } from './api-manager';
import { settings } from '../config/settings';


async function uploadBase64(base64data, filename, entity) {
    let body = {
        'filename': filename,
        'filedata': base64data,
        'entity': entity
    }
    console.warn(body)
    let response = await ApiManager.sendAuthenticatedRequest('/resource/uploadFile', body)
    return response;
}


/** tinymce **/
async function uploadImageTiny(blobInfo, filename, entity) {
    var blobInfoBlob = blobInfo.blob();
    var fileType = blobInfoBlob.type;
    var base64data = blobInfo.base64();
    return uploadBase64Tiny(base64data, filename, entity, fileType)
}
async function uploadBase64Tiny(base64data, filename, entity, type) {
    let b64 = 'data:'+type+';base64,'+base64data
    const response = await uploadBase64(b64, filename, entity)
    return response
}


async function getFile(hash, entity) {
    let body = {
        'hash': hash,
        'entity': entity
    }
    let response = await ApiManager.sendAuthenticatedRequest('/resource/getFile', body)
    return response
}

function getFileUrl(data, entity) {
    let url = settings.ckdPath + 'upload/' + entity + '/' + data.hash + '.' + data.extension
    return url;
}



export const ResourceManager = {
    uploadBase64: uploadBase64,
    uploadImageTiny: uploadImageTiny,
    uploadBase64Tiny: uploadBase64Tiny,
    getFileUrl: getFileUrl
};