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

window.onload = function () {
    window.scrollTo(0, getScroll());
    let element = document.querySelector(".header");
    let scrollUp = document.getElementById('scrollUp');

    scrollUp.onclick = function () {
        window.scrollTo(0, 0);
    };

    window.onscroll = function () {
        if (window.pageYOffset >= 57) {
            element.style.display = "none";
            scrollUp.style.display = 'block';
        } else {
            element.style.display = "block";
            scrollUp.style.display = 'none';
        }
    };
};