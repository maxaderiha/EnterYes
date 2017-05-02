'use strict';

const requestModel = (function () {
    function getArticles() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/articles');

            request.onload = () => {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText, (key, value) => {
                        if (key === 'createdAt') {
                            return new Date(value);
                        }
                        return value;
                    }));
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function editArticle(articles) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PATCH', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(articles));
        });
    }

    function addArticle(articles) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', '/articles');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(articles));
        });
    }

    function deleteArticle(id) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', `/articles/${id}`);

            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function showContent(link) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `/page/${link}`);

            request.onload = () => {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    function logIn(user) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', '/login');
            request.setRequestHeader('content-type', 'application/json');

            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send(JSON.stringify(user));
        });
    }

    function logOut() {
        return new Promise((resolve) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/logout');

            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.send();
        });
    }

    function getUserName() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', '/username');

            request.onload = () => {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject();
                }
            };
            request.onerror = () => {
                reject(new Error('Error'));
            };
            request.send();
        });
    }

    return {
        logIn,
        logOut,
        getUserName,
        showContent,
        getArticles,
        editArticle,
        addArticle,
        deleteArticle,
    };
}());
