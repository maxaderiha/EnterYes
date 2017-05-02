'use strict';

function deletePost(id) {
    idEditPage = id || idEditPage;
    requestModel.deleteArticle(idEditPage).then(() => {
        mainPage();
    });
}
