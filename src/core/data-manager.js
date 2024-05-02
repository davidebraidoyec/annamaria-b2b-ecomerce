import { ApiManager } from './api-manager';
import { ViewManager } from './view-manager';
import { Utils } from './utils';
import { onUpdate } from '../config/hooks/onUpdate.js';
import { onDelete } from '../config/hooks/onDelete.js';
import { onInsert } from '../config/hooks/onInsert.js';


async function getItems(entity, page, limit, sorting) {
    let offset = page * limit - limit;
    let order = sorting.field + ' ' + sorting.order
    let body = {
        order: order,
        page: page,
        limit: limit,
        offset: offset
    }
    let response = await ApiManager.sendAuthenticatedRequest('/get_items/' + entity, body)
    return response;
}

async function getItem(entity, id) {
    let body = {
        id: id
    }
    let response = await ApiManager.sendAuthenticatedRequest('/get_item/' + entity, body)
    return response;
}

async function updateItem(entity, data, id) {
    var pData = parseData(entity, data)
    let body = {
        id: id,
        action: 'edit',
        body: pData
    }
    let response = await ApiManager.sendAuthenticatedRequest('/post/' + entity, body)
    onUpdate(response, entity, data, id)
    return response;
}

async function insertItem(entity, data) {
    var pData = parseData(entity, data)
    let body = {
        action: 'create',
        body: pData
    }
    let response = await ApiManager.sendAuthenticatedRequest('/post/' + entity, body)
    onInsert(response, entity, data)
    return response;
}

async function deleteItem(entity, id) {
    let body = {
        id: id
    }
    let response = await ApiManager.sendAuthenticatedRequest('/delete/' + entity, body)
    onDelete(response, entity, id)
    return response;
}

async function searchItems(entity, page, limit, sorting, query, fields, constraints) {
    let offset = page * limit - limit;
    let order = sorting.field + ' ' + sorting.order
    let body = {
        order: order,
        page: page,
        limit: limit,
        offset: offset,
        query: query,
        fields: fields,
        constraints: constraints
    }
    let response = await ApiManager.sendAuthenticatedRequest('/search_items/' + entity, body)
    return response;
}

function parseData(entity, data) {
    let parsed = {}
    let props = ViewManager.getEntityProperties(entity);
    for (const [key, value] of Object.entries(data)) {
        //console.log(entity, key, value);
        if(typeof value != 'undefined' && value !== null && props.columns[key]) {
            var type = props.columns[key].input_type;
            if(type === 'externalEntity') {
                parsed[key] = value.id
            }
            else if(type === 'deepExternalEntity') {
                //console.warn()
                var temp = [];
                for (var i=0; i<value.length; i++) {
                    var p = parseData(props.columns[key].options.entity, value[i])
                    temp.push(p)
                }
                parsed[key] = temp;
            }
            else if(type === 'multipleExternalEntity') {
                var temp = [];
                for (var i=0; i<value.length; i++) {
                    var id = value[i].id
                    temp.push(id)
                }
                parsed[key] = temp;
            }
            else if(type === 'option') {
                parsed[key] = value.value
            }
            else if(type === 'file') {
                parsed[key] = value.hash
            }
            else if(type === 'password') {
                console.log('p', value)
                if(value !== '' && value !== null) {
                    parsed[key] = Utils.encrypt(value)
                }
            }
            else if(type === 'boolean') {
                if(value != 1 && value != 0) {
                    parsed[key] = 0
                }
                else {
                    parsed[key] = value
                }
            }
            else if(type === 'date') {
                if(value === '') {
                    parsed[key] = null
                }
                else {
                    parsed[key] = value
                }
            }
            else if(type === 'time') {
                if(value === '') {
                    parsed[key] = null
                }
                else {
                    parsed[key] = value
                }
            }
            else if(type === 'datetime') {
                if(value === '') {
                    parsed[key] = null
                }
                else {
                    var t = value.replace("T", " ");
                    parsed[key] = t
                }
            }
            else {
                parsed[key] = value
            }
        }
        else {
            if(props.columns[key]) {
                var type = props.columns[key].input_type;
                if(type === 'file') {
                    parsed[key] = null //save null only if it is a file cos we have to clear the field
                }
            }
            //parsed[key] = null //not adding in parsed array => field will not be updated
        }
    }
    return parsed;
}

async function exportItems(entity, page, limit, sorting, query, fields, constraints) {
    let offset = page * limit - limit;
    let order = sorting.field + ' ' + sorting.order
    let body = {
        order: order,
        page: page,
        limit: limit,
        offset: offset,
        query: query,
        fields: fields,
        constraints: constraints
    }
    let response = await ApiManager.sendAuthenticatedRequest('/export/' + entity, body)
    return response;
}


export const DataManager = {
    getItems: getItems,
    getItem: getItem,
    updateItem: updateItem,
    insertItem: insertItem,
    deleteItem: deleteItem,
    searchItems: searchItems,
    exportItems: exportItems
};