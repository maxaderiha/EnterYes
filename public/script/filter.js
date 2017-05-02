'use strict';

let filter = null;
let error = 'введите данные';

function getFilter() {
    let flag = false;
    const name = document.getElementById('author').value;
    let tags = document.getElementById('tag').value;
    const createdAt = document.getElementById('data').value;
    filter = {};
    if (name) {
        filter.author = name;
        flag = true;
    }
    if (tags) {
        tags = tags.split(/[\s.,]+/);
        filter.tags = tags;
        flag = true;
    }
    if (createdAt) {
        const date = isValidDate(createdAt);
        if (date) {
            filter.createdAt = date;
            flag = true;
        } else {
            error = 'неверный формат даты';
            flag = false;
        }
    }
    return flag;
}

function isValidDate(val) {
    const value = val.split(/-/);
    value[1] -= 1;
    const curDate = new Date(value[2], value[1], value[0]);
    if (!(curDate.getFullYear() === (Number)(value[2]) && curDate.getMonth() === value[1]
        && curDate.getDate() === (Number)(value[0]))) {
        return false;
    }
    return curDate;
}

function startFilter(filterConfig) {
    if (filterConfig) {
        filter = filterConfig;
        mainPage();
    } else if (getFilter()) {
        mainPage();
    } else {
        document.querySelector('.error-filter').innerHTML = error;
        document.querySelector('.error-filter').style.visibility = 'visible';
        error = 'введите данные';
    }
}

function mainPageAfterFilter() {
    filter = null;
    mainPage();
}
