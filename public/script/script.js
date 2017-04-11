"use strict";

var articleModel = (function () {

    var startID = 0;

    var articles = [{}];

    var tags = ['#TESLA', '#AVTO', '#ELECTROCAR', '#RECORD', '#EPAM', '#BUISSNES', '#COMPANY', '#DJ', '#PARTY', '#MUSIC',
        '#SPORT', '#FREESTYLE', '#GOLDMEDAL', '#ДИАДЕМА', '#DANATOWERS', '#VOGUE5A', '#СУД', '#ГАИ', '#ДТП', '#ACCENT',
        '#ТЕСТ-ДРАЙВ', '#ВЕЙПИНГ', '#КОНСТАНТИНКОСТЮЧЕНКО', '#НАГЛЫЕВОДИТЕЛИ', '#СПРАВЕДЛИВОСТЬ', '#MWC', '#KINO-MO',
        '#NOKIA3310', '#CAVIAR', 'TITANO', '#ЛУКАШЕНКО', '#ПОПУЛЯРНОЕ', '#ПОЛИТИКА'];

    function getArticles(skip, top, filterConfig) {

        if (!skip) {
            skip = 0;
        }
        if (skip >= articles.length) {
            return null;
        }
        if (!top) {
            top = 10;
        }

        articles.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        var newArticles = [];
        var index = 0;

        if (!filterConfig) {
            return articles.slice(skip, top + skip);

            //for (var i = skip; i < articles.length && i < top + skip; i++) {
              // newArticles[index] = articles[i];
                //index++;
            //}
        }       else {
            if (filterConfig.author && filterConfig.tags && filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author === articles[i].author && findTag(filterConfig.tags, articles[i].tags)
                        && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author && filterConfig.tags && !filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author === articles[i].author && findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author && !filterConfig.tags && filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author === articles[i].author && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author && !filterConfig.tags && !filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author === articles[i].author) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (!filterConfig.author && filterConfig.tags && filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags) && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (!filterConfig.author && filterConfig.tags && !filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (!filterConfig.author && !filterConfig.tags && filterConfig.createdAt) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }
            count = newArticles.length;
        }
        return newArticles;
    }

    function findTag(tags, articleTags) {
       return tags.some(tag => articleTags.indexOf(tag) !== -1);
    }

    function getArticle(id) {
        return articles.find(article => article.id === id);
    }

    function isArticle(id) {
        return articles.indexOf(getArticle(id));
    }

    function validateArticle(article) {
        if (typeof article.id === "string" &&
            typeof article.createdAt === "object" &&
            typeof article.tags === "object" && article.tags.length >= 1 && article.tags.length <= 5 &&
            typeof article.author === "string" && article.author.length > 0 &&
            typeof article.content === "string" && article.content.length > 0 &&
            typeof article.title === "string" && article.title.length > 0 && article.title.length <= 100) {
            return true;
        }
        return false;
    }

    function addArticle(article) {
        //articles.push(article);
        articles[articles.length] = article;
        addToTagsArray(article.tags);
    }

    function editArticle(id, article) {
        var index = isArticle(id);
        if (index === -1) {
            return false;
        }
        if (article.id && article.author && article.createdAt) {
            return false;
        }
        if (article.title && typeof  article.title === "string" && article.title.length > 0 &&
            article.title.length <= 100) {
            articles[index].title = article.title;
        }
        if (article.summary && typeof article.summary === "string" && article.summary.length > 0 &&
            article.summary.length <= 200) {
            articles[index].summary = article.summary;

        }
        if (article.content && typeof  article.content === "string" && article.content.length > 0) {
            articles[index].content = article.content;
        }
        if (article.tags[0] !== "" && article.tags && article.tags.length >= 1 && article.tags.length <= 5) {
            articles[index].tags = article.tags;
            addToTagsArray(article.tags);
        }
        return true;
    }

    function removeArticle(id) {

        if (isArticle(id) === -1) return false;
        articles.splice(isArticle(id), 1);
        return true;


       /* var index = isArticle(id);
        if (index === -1) {
            return false;
        } else {
            articles.splice(index, 1);
            return true;
        }
        */
    }

    function isContainTag(tag) {
        if (tag && typeof tag === "string") {
            for (var i = 0; i < tags.length; i++) {
                if (tag === tags[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    function addToTagsArray(tag) {
        var index = tags.length;
        for (var i = 0; i < tag.length; i++) {
            if (!isContainTag(tag[i]))
                tags[index++] = tag[i];
        }
    }

    function replaceArticles() {
        articles = JSON.parse(requestModel.getArticles(), (key, value) => {
            if (key === 'createdAt') return new Date(value);
            return value;
        });

        //articles = JSON.parse(requestModel.getArticles());
        //for (var i = 0; i < articles.length; i++) {
          //  articles[i].createdAt = new Date(articles[i].createdAt);
        //}
        count = articles.length;
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        replaceArticles: replaceArticles,
        getArticlesLength: articles.length,
        getStartID: startID
    };
}());

var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        /* DOM Загрузился.
         Можно найти в нем нужные элементы и сохранить в переменные */
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.feed');
    }

    function insertArticlesInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        var articlesNodes = renderArticles(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        /* каждый объект article из массива преобразуем в HTML элемент */
        if (!articles) return;

        return articles.map(article => {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toDateString();
        template.content.querySelector('.tags-ul').innerHTML = '';
        article.tags.forEach(tag => {
            var newLi = document.createElement('li');
            newLi.innerHTML = tag;
            template.content.querySelector('.tags-ul').appendChild(newLi);
        });
        template.content.querySelector('.article-list-item-img').setAttribute("src", article.img);
        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());

var amountLoadedArticles = 10;

var count;

function startApp() {
    articleModel.replaceArticles();
    articleRenderer.init();

    /*let promise = articleModel.getArticles(0, 10);
    promise.then(articles => {
        renderArticles(articles);
    });
    */

    renderArticles(0, amountLoadedArticles, filter);
    addUserUI();

    document.querySelector(".trans").style.display = "none";
    if (amountLoadedArticles < count) {
        document.querySelector(".trans").style.display = "block";
    }
}

function renderArticles(skip, top, filter) {
    // 1. Удалим статьи из HTML
    articleRenderer.removeArticlesFromDom();

    // 2. Достанем статьи из модели

    var articles = articleModel.getArticles(skip, top, filter);

    // 3. Отобразим статьи
    articleRenderer.insertArticlesInDOM(articles);
}

function showMore() {
    var key = count - amountLoadedArticles;
    if (key > 0) {
        if (key < 10) {
            amountLoadedArticles += key;
        } else {
            amountLoadedArticles += 10;
        }
        setScroll();
        startApp();
        addUserUI();
    } else {
        document.querySelector(".trans").style.display = "none";
    }
}

function reloadNews() {
    startApp();
    addUserUI();
}

document.addEventListener('DOMContentLoaded', startApp);
