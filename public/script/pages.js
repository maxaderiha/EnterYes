"use strict";
let scrollTop = 0;
let scrollLeft = 0;

function mainPage() {
    document.getElementById("feed").style.display = "block";
    document.getElementById("login-page").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("add-page").style.display = "none";
    document.getElementById("filter-id").style.display = "none";
    document.getElementById("detail-view-page").style.display = "none";
    showTrans();
    window.scrollTo(scrollLeft, scrollTop);
}

function authorizationPage() {
    setScroll();
    if (username !== null) {
        username = null;
        localStorage.clear("username");
        addUserUI();
        mainPage();
        return;
    }
    document.getElementById("login-page").style.display = "block";
    document.querySelector(".incorrect-input").style.visibility = "hidden";
}


let options = {weekday: 'narrow', year: 'numeric', month: 'long', day: 'numeric'};

function setScroll(param) {
    if (param === 0) {
        scrollTop = 0;
        scrollLeft = 0;
    } else {
        scrollTop = window.pageYOffset;
        scrollLeft = window.pageXOffset;
    }
}

function addPage() {
    setScroll(0);
    document.getElementById("feed").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("filter-id").style.display = "none";
    document.getElementById("detail-view-page").style.display = "none";
    document.querySelector(".trans").style.display = "none";
    document.querySelector(".error-add").style.visibility = "hidden";
    document.getElementById("add-page").style.display = "block";
    window.scrollTo(0, 0);
}

function filterPage() {
    setScroll(0);
    document.getElementById("feed").style.display = "none";
    document.getElementById("edit-page").style.display = "none";
    document.getElementById("add-page").style.display = "none";
    document.querySelector(".trans").style.display = "none";
    document.getElementById("detail-view-page").style.display = "none";
    document.querySelector(".error-filter").style.visibility = "hidden";
    document.getElementById("filter-id").style.display = "block";
    window.scrollTo(0, 0);
}

function detailViewPage(id) {
    idEditPage = id;
    setScroll();
    window.scrollTo(0, 0);
    let article = articleModel.getArticle(id);
    let artDate = article.createdAt.toLocaleDateString("ru", options);

    // requestModel.showContent('detailView').then(function (code) {
    //     let page = document.getElementById("detail-view-page");
    //     page.innerHTML = code;
    //     page.style.margin = "147px auto 90px auto";


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
    // });


    document.getElementById("feed").style.display = "none";
    document.querySelector(".trans").style.display = "none";
    document.getElementById("detail-view-page").style.display = "block";
}