"use strict";
let requestModel = (function () {
    function getArticles() {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', '/articles');

            request.onload = function () {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText, (key, value) => {
                        if (key === 'createdAt') {
                            return new Date(value);
                        }
                        return value;
                    }));
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));

            };
            request.send();
        });
    }

    function editArticle(articles) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('PATCH', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));

            };
            request.send(JSON.stringify(articles));
        });

    }

    function addArticle(articles) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('POST', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));

            };
            request.send(JSON.stringify(articles));
        });

    }

    function deleteArticle(id) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('DELETE', '/articles/' + id);

            request.onload = function () {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = function () {
                reject(new Error("Error"));
            };
            request.send();
        });
    }

    // function showContent(link) {
    //     return new Promise(function (resolve, reject) {
    //         let request = new XMLHttpRequest();
    //         request.open('GET', '/page/' + link);
    //
    //         request.onload = function () {
    //             if (request.status === 200) {
    //                 resolve(request.responseText);
    //             }
    //         };
    //         request.onerror = function () {
    //             reject(new Error("Error"));
    //         };
    //
    //         request.send();
    //     });
    // }

    return {
        // showContent: showContent,
        getArticles: getArticles,
        editArticles: editArticle,
        addArticles: addArticle,
        deleteArticles: deleteArticle
    }
}());