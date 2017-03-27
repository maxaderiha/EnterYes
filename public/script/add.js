"use strict";
var addModel = (function () {
    function getNewArticle() {
        return {
            id: (String)(++articleModel.getStartID),
            title: document.getElementById("title-add").value,
            content: document.getElementById("content-add").value,
            summary: getSummary(document.getElementById("content-add")),
            createdAt: new Date(),
            author: username,
            tags: document.getElementById("tags-add").value.split(/[\s.,]+/),
            img: 'http://cnnwire.images.worldnow.com/images/10897858_G.jpg'
        }
    }

    function checkForAdd(article) {
        return articleModel.validateArticle(article);
    }

    return {
        getNewArticle: getNewArticle,
        checkForAdd: checkForAdd
    }
}());

function addPost() {
    var art = addModel.getNewArticle();
    if (addModel.checkForAdd(art)) {
        articleModel.addArticle(art);
        articleModel.storageArticles();
        reloadNews();
        mainPage();
    } else {
        document.querySelector(".error-add").style.visibility = "visible";
    }
}