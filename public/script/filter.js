"use strict";
let filter = null;
let error = "введите данные";

function getFilter() {
    let flag = false;
    let name = document.getElementById("author").value;
    let tags = document.getElementById("tag").value;
    let createdAt = document.getElementById("data").value;
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
        let date = isValidDate(createdAt);
        if (date) {
            filter.createdAt = date;
            flag = true;
        } else {
            error = "неверный формат даты";
            flag = false;
        }
    }
    return flag;
}

function isValidDate(val) {
    let val_r = val.split(/-/);
    val_r[1] -= 1;
    let curDate = new Date(val_r[2], val_r[1], val_r[0]);
    if (!(curDate.getFullYear() == val_r[2] && curDate.getMonth() == val_r[1] && curDate.getDate() == val_r[0])) return false;
    return curDate;
}

function startFilter() {
    if (getFilter()) {
        mainPage();
    } else {
        document.querySelector(".error-filter").innerHTML = error;
        document.querySelector(".error-filter").style.visibility = "visible";
        error = "введите данные";
    }
}

function mainPageAfterFilter() {
    filter = null;
    mainPage();
}