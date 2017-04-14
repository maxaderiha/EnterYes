"use strict";
let requestModel = (function () {
    function getArticles() {
        let request = new XMLHttpRequest();
        request.open('GET', '/articles', false);
        request.send();

        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                return request.responseText;
            }
        };
        return request.onreadystatechange();
    }

    function editArticle(articles) {
        let request = new XMLHttpRequest();
        request.open('PATCH', '/articles');
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(articles));
    }

    function addArticle(articles) {
        let request = new XMLHttpRequest();
        request.open('POST', '/articles');
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(articles));
    }

    function deleteArticle(id) {
        let request = new XMLHttpRequest();
        request.open('DELETE', '/articles/' + id);
        request.send();
    }

    return {
        getArticles: getArticles,
        editArticles: editArticle,
        addArticles: addArticle,
        deleteArticles: deleteArticle
    }
}());