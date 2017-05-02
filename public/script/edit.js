'use strict';

let idEditPage;

const editModel = (function () {
    function editPage(id) {
        if (id) setScroll(window.pageYOffset);
        idEditPage = id || idEditPage;
        const editArticle = articleModel.getArticle(idEditPage);
        requestModel.showContent('editPage').then((code) => {
            document.getElementById('content-body').innerHTML = code;
            document.getElementById('title').value = editArticle.title;
            document.getElementById('content').value = editArticle.content;
            document.getElementById('tags').value = editArticle.tags;
            document.getElementById('scrollUp').style.display = 'none';
            document.querySelector('.error-edit').style.visibility = 'hidden';
        });
        window.scrollTo(0, 0);
    }

    function getNewArticle() {
        return {
            title: document.getElementById('title').value,
            id: idEditPage,
            content: document.getElementById('content').value,
            summary: getSummary(content),
            tags: document.getElementById('tags').value.split(/[\s.,]+/),
        };
    }

    function checkForEdit(article) {
        return article.title && typeof article.title === 'string' && article.title.length > 0 &&
            article.title.length <= 100 && article.summary && typeof article.summary === 'string' &&
            article.summary.length > 0 && article.summary.length <= 200 && article.content &&
            typeof article.content === 'string' && article.content.length > 0 && article.tags[0] !== '' &&
            article.tags && article.tags.length >= 1 && article.tags.length <= 5;
    }

    return {
        getNewArticle,
        checkForEdit,
        editPage,
    };
}());

function editPost() {
    const art = editModel.getNewArticle();
    if (editModel.checkForEdit(art)) {
        requestModel.editArticle(art).then(() => {
            mainPage();
        });
    } else {
        document.querySelector('.error-edit').style.visibility = 'visible';
    }
}
