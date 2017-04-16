"use strict";
function deletePost(id) {
    if (id) setScroll();
    idEditPage = id || idEditPage;
    requestModel.deleteArticles(idEditPage);
    reloadNews();
    mainPage();
}