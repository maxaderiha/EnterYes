"use strict";

function mainPage() {
    requestModel.showContent('mainPage').then(function (code) {
        document.getElementById('content-body').innerHTML = code;
        reloadNews();
    });
}

function authorizationPage() {
    if (username !== null) {
        username = null;
        localStorage.clear("username");
        mainPage();
        addUserUI();
        return;
    }
    requestModel.showContent('logInPage').then(function (code) {
        let cont = document.getElementById('login-page');
        cont.innerHTML = code;
        cont.style.display = "block";
        document.querySelector(".incorrect-input").style.visibility = "hidden";
    });
}

function closeAuthorizationPage() {
    document.getElementById('login-page').style.display = "none";
}


let options = {weekday: 'narrow', year: 'numeric', month: 'long', day: 'numeric'};

function setScroll(param) {
    localStorage.setItem("scroll", param);
}

function getScroll() {
    return JSON.parse(localStorage.getItem("scroll"));
}

function removeScroll() {
    localStorage.removeItem("scroll");
}

function addPage() {
    requestModel.showContent('addPage').then(function (code) {
        document.getElementById('content-body').innerHTML = code;
        document.querySelector(".error-add").style.visibility = "hidden";
    });
}

function filterPage() {
    requestModel.showContent('filterPage').then(function (code) {
        document.getElementById('content-body').innerHTML = code;
        document.querySelector(".error-filter").style.visibility = "hidden";
    });
}

function detailViewPage(id) {
    setScroll(window.pageYOffset);
    idEditPage = id;
    let article = articleModel.getArticle(id);
    let artDate = article.createdAt.toLocaleDateString("ru", options);

    window.scrollTo(0, 0);
    requestModel.showContent('detailView').then(function (code) {
        document.getElementById('content-body').innerHTML = code;
        document.getElementById("summary-dw").innerHTML = article.summary.slice(0, article.summary.length - 3);
        document.getElementById("title-dw").innerHTML = article.title;
        document.getElementById("author-dw").innerHTML = article.author;
        document.getElementById("time-dw").innerHTML = artDate;
        document.getElementById("img-dw").setAttribute("src", article.img);
        document.getElementById("content-dw").innerHTML = article.content.slice(article.summary.length - 3);
        let tagList = document.querySelector(".tag_list");
        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild);
        }
        article.tags.forEach(tag => {
            let newTag = document.createElement('a');
            newTag.innerHTML = tag;
            tagList.appendChild(newTag);
        });
        addUserUI();
    });
}

function scrollAfterDV() {
    if (getScroll()) {
        window.scrollTo(0, getScroll());
        removeScroll();
    }
}