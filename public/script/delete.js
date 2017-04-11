"use strict";
function deletePost(id) {
    requestModel.deleteArticles(id);
    setScroll();
    reloadNews();
}