'use strict';

let amountLoadedArticles = 10;
const limit = 10;

const articleModel = (function () {
    function validateArticle(article) {
        return (
        typeof article.createdAt === 'object' &&
        typeof article.tags === 'object' && article.tags.length >= 1 && article.tags.length <= 5 &&
        typeof article.author === 'string' && article.author.length > 0 &&
        typeof article.content === 'string' && article.content.length > 196 &&
        typeof article.title === 'string' && article.title.length > 0 && article.title.length <= 100);
    }

    return {
        validateArticle,
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

    function rendArticles(articles) {
        if (!articles) return;
        return articles.map(article => renderArticle(article));
    }

    function insertArticlesInDOM(articles) {
        const articlesNodes = rendArticles(articles);

        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function renderArticle(article) {
        const template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article._id;
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

function startApp() {
    articleRenderer.init();
    renderArticles(0, limit, filter);
}

function renderArticles(skip, top, filter) {
    articleRenderer.removeArticlesFromDom();
    requestModel.getArticles(skip, top + 1, filter).then((articles) => {
        if (articles.length === 0) errorPage();
        articleRenderer.insertArticlesInDOM(articles.slice(0,
            showTransButton(articles.length, top)));
        addUserUI();
        scrollAfterDV();
    });
}

function showTransButton(length, param) {
    const transButton = document.querySelector('.trans');
    if (length === param + 1) {
        transButton.style.display = 'block';
        return length - 1;
    }
    transButton.style.display = 'none';
    return length;
}

function incAmountLoadedArticles(length, param) {
    if (length === param + 1) {
        amountLoadedArticles += length - 1;
        return;
    }
    amountLoadedArticles += length;
}

function showMore() {
    requestModel.getArticles(amountLoadedArticles, limit + 1, filter)
        .then((articles) => {
            incAmountLoadedArticles(articles.length, limit);
            articleRenderer.insertArticlesInDOM(articles.slice(0,
                showTransButton(articles.length, limit)));
            addUserUI();
        });
}

function reloadNews() {
    amountLoadedArticles = 10;
    articleRenderer.init();
    renderArticles(0, amountLoadedArticles, filter);
    moveScrollUp();
}

document.addEventListener('DOMContentLoaded', startApp);
