'use strict';

const articleModel = (function () {
    let articles = [];

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        if (skip >= articles.length) {
            return null;
        }
        top = top || 10;

        articles.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        if (!filterConfig) {
            return articles.slice(skip, top + skip);
        }

        const newArticles = articles.filter((element) => {
            if (filterConfig.author && element.author !== filterConfig.author) {
                return false;
            }
            if (filterConfig.tags && !filterConfig.tags.some((tag) => {
                return element.tags.some((tagArt) => {
                    return tag === tagArt;
                });
            })) {
                return false;
            }
            return !(filterConfig.createdAt &&
            element.createdAt.toDateString() !== filterConfig.createdAt.toDateString());
        });
        return newArticles.slice(skip, top + skip);
    }

    function getArticle(id) {
        return articles.find(article => article.id === id);
    }

    function isArticle(id) {
        return articles.indexOf(getArticle(id));
    }

    function validateArticle(article) {
        return (typeof article.id === 'string' &&
        typeof article.createdAt === 'object' &&
        typeof article.tags === 'object' && article.tags.length >= 1 && article.tags.length <= 5 &&
        typeof article.author === 'string' && article.author.length > 0 &&
        typeof article.content === 'string' && article.content.length > 196 &&
        typeof article.title === 'string' && article.title.length > 0 && article.title.length <= 100);
    }

    function addArticle(article) {
        articles.push(article);
    }

    function editArticle(id, article) {
        const index = isArticle(id);
        if (index === -1) {
            return false;
        }
        if (article.id && article.author && article.createdAt) {
            return false;
        }
        if (article.title && typeof article.title === 'string' && article.title.length > 0 &&
            article.title.length <= 100) {
            articles[index].title = article.title;
        }
        if (article.summary && typeof article.summary === 'string' && article.summary.length > 0 &&
            article.summary.length <= 200) {
            articles[index].summary = article.summary;
        }
        if (article.content && typeof article.content === 'string' && article.content.length > 0) {
            articles[index].content = article.content;
        }
        if (article.tags[0] !== '' && article.tags && article.tags.length >= 1 && article.tags.length <= 5) {
            articles[index].tags = article.tags;
        }
        return true;
    }

    function removeArticle(id) {
        if (isArticle(id) === -1) return false;
        articles.splice(isArticle(id), 1);
        return true;
    }

    function replaceArticles() {
        return new Promise(resolve => requestModel.getArticles().then(
            (array) => {
                articles = array;
                count = articles.length;
                resolve();
            }));
    }

    return {
        getArticles,
        getArticle,
        validateArticle,
        addArticle,
        editArticle,
        removeArticle,
        replaceArticles,
        getArticlesLength: articles.length,
    };
}());

const articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.feed');
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        if (!articles) return;

        return articles.map((article) => {
            return renderArticle(article);
        });
    }

    function insertArticlesInDOM(articles) {
        const articlesNodes = renderArticles(articles);

        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function renderArticle(article) {
        const template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toLocaleDateString('ru', options);
        template.content.querySelector('.tags-ul').innerHTML = '';
        article.tags.forEach((tag) => {
            const newLi = document.createElement('li');
            newLi.innerHTML = tag;
            template.content.querySelector('.tags-ul').appendChild(newLi);
        });
        template.content.querySelector('.article-list-item-img').setAttribute('src', article.img);
        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    return {
        init,
        insertArticlesInDOM,
        removeArticlesFromDom,
    };
}());

let amountLoadedArticles = 10;

let count;

function startApp() {
    articleModel.replaceArticles().then(
        () => {
            articleModel.replaceArticles();
            articleRenderer.init();

            renderArticles(0, amountLoadedArticles, filter);
            addUserUI();
            showTrans();
            scrollAfterDV();
        });
}

function showTrans() {
    document.querySelector('.trans').style.display = 'none';
    if (amountLoadedArticles < count) {
        document.querySelector('.trans').style.display = 'block';
    }
}

function renderArticles(skip, top, filter) {
    articleRenderer.removeArticlesFromDom();
    const articles = articleModel.getArticles(skip, top, filter);
    if (filter) count = articles.length;
    articleRenderer.insertArticlesInDOM(articles);
}

function showMore() {
    const key = count - amountLoadedArticles;
    if (key > 0) {
        if (key < 10) {
            amountLoadedArticles += key;
        } else {
            amountLoadedArticles += 10;
        }
        startApp();
        addUserUI();
    } else {
        document.querySelector('.trans').style.display = 'none';
    }
}

function reloadNews() {
    startApp();
    addUserUI();
}

document.addEventListener('DOMContentLoaded', startApp);
