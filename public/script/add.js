"use strict";
let addModel = (function () {

    function getNewArticle() {
        let curDate = new Date();
        return {
            title: document.getElementById("title-add").value,
            content: document.getElementById("content-add").value,
            summary: getSummary(document.getElementById("content-add")),
            createdAt: curDate,
            author: username,
            id: (String)(username + curDate),
            tags: document.getElementById("tags-add").value.split(/[\s.,]+/),
            img: 'http://galerey-room.ru/img_2/70d46221268405a3670806307e35cdeb.jpg'//'https://droidtalks.com/wp-content/uploads/2016/02/space.jpg'
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
    let art = addModel.getNewArticle();

    if (addModel.checkForAdd(art)) {
        requestModel.addArticles(art);
        reloadNews();
        mainPage();
    } else {
        document.querySelector(".error-add").style.visibility = "visible";
    }
}