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

window.onscroll = function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled >= 57) {
        document.querySelector(".header").style.display = "none";
    } else {
        document.querySelector(".header").style.display = "block";
    }
};