'use strict';

const addModel = (function () {
    function getNewArticle() {
        const curDate = new Date();
        requestModel.getUserName().then(
            username =>
                addPost({
                    title: document.getElementById('title-add').value,
                    content: document.getElementById('content-add').value,
                    summary: getSummary(document.getElementById('content-add')),
                    createdAt: curDate,
                    author: username,
                    id: (String)(username + curDate),
                    tags: document.getElementById('tags-add').value.split(/[\s.,]+/),
                    img: 'https://droidtalks.com/wp-content/uploads/2016/02/space.jpg',
                }));
    }

    function checkForAdd(article) {
        return articleModel.validateArticle(article);
    }

    return {
        getNewArticle,
        checkForAdd,
    };
}());

function addPost() {
    const curDate = new Date();
    requestModel.getUserName().then(
        (username) => {
            const art = {
                title: document.getElementById('title-add').value,
                content: document.getElementById('content-add').value,
                summary: getSummary(document.getElementById('content-add')),
                createdAt: curDate,
                author: username,
                id: (String)(username + curDate),
                tags: document.getElementById('tags-add').value.split(/[\s.,]+/),
                img: 'https://droidtalks.com/wp-content/uploads/2016/02/space.jpg',
            };
            if (addModel.checkForAdd(art)) {
                requestModel.addArticle(art).then(() => mainPage());
            } else {
                document.querySelector('.error-add').style.visibility = 'visible';
            }
        });
}
