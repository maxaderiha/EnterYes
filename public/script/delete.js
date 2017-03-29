"use strict";
function deletePost(id) {
    if (articleModel.removeArticle(id)) {
        --amountLoadedArticles;
    }
    articleModel.storageArticles();
    setScroll();
    reloadNews();
}