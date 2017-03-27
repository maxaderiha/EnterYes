"use strict";
var countDeletePost = 0;

function deletePost(id) {
    if (articleModel.removeArticle(id)) {
        ++countDeletePost;
    }
    articleModel.storageArticles();
    setScroll();
    reloadNews();
}