'use strict';

window.onload = () => {
    window.scrollTo(0, getScroll());
    const element = document.querySelector('.header');
    const scrollUp = document.getElementById('scrollUp');
    const arrow = document.getElementById('upOrBackButton');

    scrollUp.onclick = () => {
        if (arrow.className === 'fa fa-arrow-up fa-3x') {
            return up();
        }
        mainPage();
    };

    window.onscroll = () => {
        const flag = document.querySelector('.detail-view');
        if (window.pageYOffset >= 57) {
            element.style.display = 'none';
            scrollUp.style.display = 'block';
            arrow.className = 'fa fa-arrow-up fa-3x';
        } else {
            element.style.display = 'block';
            if (flag) {
                scrollUp.style.display = 'block';
                arrow.className = 'fa fa-arrow-left fa-3x';
            } else {
                scrollUp.style.display = 'none';
            }
        }
    };
};

let t;
let scrollFlag;

function up() {
    const top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (top > 0) {
        window.scrollBy(0, -100);
        t = setTimeout(() => {
            up();
        }, 20);
    } else clearTimeout(t);
    return false;
}

function setScroll(param) {
    localStorage.setItem('scroll', param);
}

function getScroll() {
    return JSON.parse(localStorage.getItem('scroll'));
}

function removeScroll() {
    localStorage.removeItem('scroll');
}

function moveScrollUp() {
    if (scrollFlag) {
        window.scrollTo(0, 0);
        scrollFlag = false;
    }

}