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

window.onload = () => {
    window.scrollTo(0, getScroll());
    const element = document.querySelector('.header');
    const scrollUp = document.getElementById('scrollUp');
    const arrow = document.getElementById('upOrBackButton');

    scrollUp.onclick = () => {
        if (arrow.className === 'fa fa-arrow-up fa-3x') {
            window.scrollTo(0, 0);
        } else {
            mainPage();
        }
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
