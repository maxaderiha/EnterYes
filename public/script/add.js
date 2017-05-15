'use strict';

function addPost() {
    const curDate = new Date();
    requestModel.getUserName().then(
        (username) => {
            const defaultImage = 'https://yandex.by/images/today?size=1920x1080';
            const art = {
                title: document.getElementById('title-add').value,
                content: document.getElementById('content-add').value,
                summary: getSummary(document.getElementById('content-add')),
                createdAt: curDate,
                author: username,
                tags: document.getElementById('tags-add').value.split(/[\s.,]+/),
                img: document.getElementById('add-photo').value || defaultImage,
            };
            if (articleModel.validateArticle(art)) {
                requestModel.addArticle(art).then(() => mainPage());
            } else {
                document.querySelector('.error-add').style.visibility = 'visible';
            }
        });
}
