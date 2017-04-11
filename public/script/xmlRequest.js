"use strict";
var requestModel = (function () {
    function getArticles() {

        //promise
        /*let promise = new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/articles', true);
            xhr.send();

            xhr.onload = () => {
                resolve(xhr.responseText);
            }
        });

        */
        var request = new XMLHttpRequest();
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
        var request = new XMLHttpRequest();
        request.open('PATCH', '/articles');
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(articles));
    }

    function addArticle(articles) {
        var request = new XMLHttpRequest();
        request.open('POST', '/articles');
        request.setRequestHeader('content-type', 'application/json');
        request.send(JSON.stringify(articles));
    }

    function deleteArticle(id) {
        var request = new XMLHttpRequest();
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