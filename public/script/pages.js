"use strict";

function mainPage() {
    document.getElementById("feed").style.display = "block";
    document.getElementById("login-page").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("add-page").style.display = "none";
    document.getElementById("filter-id").style.display = "none";
    //window.scrollTo(0, 0);
    // document.getElementById("navigation-row").style.display = "block";
    // document.getElementById("main-page").style.display = "block";
    // document.getElementById("authorization-page").style.display = "none";
    // document.getElementById("add-news-page").style.display = "none";
    // document.getElementById("view-news-page").style.display = "none";
    // document.getElementById("edit-news-page").style.display = "none";
    window.scrollTo(scrollLeft, scrollTop);
}

function authorizationPage() {
    setScroll();
    if (username !== null) {
        username = null;
        addUserUI();
        return;
    }
    document.getElementById("login-page").style.display = "block";
    document.querySelector(".incorrect-input").style.visibility = "hidden";
}

var idEditPage;

var scrollTop = window.pageYOffset;
var scrollLeft = window.pageXOffset;

function setScroll(param) {
    if (param === 0) {
        scrollTop = 0;
        scrollLeft = 0;
    } else {
        scrollTop = window.pageYOffset;
        scrollLeft = window.pageXOffset;
    }
}

function editPage(id) {
    setScroll();
    idEditPage = id;
    var editArticle = articleModel.getArticle(idEditPage);
    document.getElementById("feed").style.display = "none";
    document.getElementById("title").value = editArticle.title;
    document.getElementById("content").value = editArticle.content;
    document.getElementById("tags").value = editArticle.tags;
    document.querySelector(".error-edit").style.visibility = "hidden";
    document.getElementById("edit-page").style.display = "block";
    window.scrollTo(0, 0);
}

function addPage() {
    setScroll(0);
    document.getElementById("feed").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("filter-id").style.display = "none";
    document.querySelector(".error-add").style.visibility = "hidden";
    document.getElementById("add-page").style.display = "block";
    window.scrollTo(0, 0);
}

function filterPage() {
    setScroll(0);
    document.getElementById("feed").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("add-page").style.display = "none";
    document.querySelector(".error-filter").style.visibility = "hidden";
    document.getElementById("filter-id").style.display = "block";
    window.scrollTo(0, 0);
}