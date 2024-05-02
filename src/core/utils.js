import { SHA1 } from "./sha1-js";
import _ from "lodash"; // cool kids know _ is low-dash

function encrypt(data) {
    let np = SHA1.sha1(data)
    return np;
};

function removeFromArray (array, value) {
    var i = array.indexOf(value);
    if (i > -1) {
        array.splice(i, 1);
    }

    return array;
}

function cloneObject(original){
    // copy
    var clone = _.cloneDeep(original);
    return clone;
}

export const Utils = {
    cloneObject: cloneObject,
    removeFromArray: removeFromArray,
    encrypt: encrypt
};