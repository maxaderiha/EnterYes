"use strict";
function getSummary(param) {
    param = param.value;
    if (param.length === 0) {
        return;
    }
    if (param.length <= 197) {
        return param + "...";
    } else {
        return param.slice(0, 197) + "...";
    }
}