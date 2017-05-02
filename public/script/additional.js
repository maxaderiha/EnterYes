'use strict';

function getSummary(param) {
    if (param.value.length === 0) {
        return;
    }
    if (param.value.length <= 197) {
        return `${param.value}...`;
    }
    return `${param.value.slice(0, 197)}...`;
}
