"use strict";

var articleModel = (function () {

    var startID = 0;

    var articles = [
        {
            id: (String)(++startID),
            title: 'Tesla установила рекорд по дальности пробега электрокара.',
            summary: 'Увеличить дальность пробега производитель смог за счет новых 100-киловаттовых батарей',
            createdAt: new Date(2016, 6, 16),
            author: "Адериха",
            content: 'Увеличить дальность пробега производитель смог за счет новых 100-киловаттовых батарей.Компания Tesla' +
            ' начала оснащать свои электрокары - седан Model S и вседорожник Model X - 100-киловаттными батареями. Их мощь' +
            ' в сочетании с относительно невысоким потреблениемэнергии дают автомобилям самый большой запас хода...',
            tags: ['#TESLA', '#AVTO', '#ELECTROCAR', '#RECORD'],
            img: 'http://otoblog.com/wp-content/uploads/2015/07/2013-Tesla-Model-S_Sedan-Image-02-1280.jpg'
        },
        {
            id: (String)(++startID),
            title: 'Доходы EPAM в 2016 году превысили миллиард долларов.',
            summary: 'Компания EPAM опубликовала финансовый отчет по итогам 2016 года. За отчетный период выручка разработчика' +
            ' ПО достигла 1,16 миллиарда долларов, что почти на 27% больше по сравнению с 2015 годом...',
            createdAt: new Date(2016, 1, 28),
            author: 'Адериха М. А.',
            content: 'Компания EPAM опубликовала финансовый отчет по итогам 2016 года. За отчетный период выручка разработчика' +
            ' ПО достигла 1,16 миллиарда долларов, что почти на 27% больше по сравнению с 2015 годом...',
            tags: ['#EPAM', '#BUISSNES', '#COMPANY'],
            img: 'http://www.growthhackermag.com/wp-content/uploads/2015/12/images92.jpg'
        },
        {
            id: (String)(++startID),
            title: '"Пенные вечеринки уже не в моде". Репортаж с деревенской дискотеки, кудаприезжают городские.',
            summary: 'Деревня Плебановцы Волковысского района — совсем маленькая, несколько десятков сельских домов.' +
            ' Из развлечений — только магазин и клуб...',
            createdAt: new Date(2017, 2, 26),
            author: 'Адериха',
            content: 'Деревня Плебановцы Волковысского района — совсем маленькая, несколько десятков сельских домов.' +
            ' Из развлечений — только магазин и клуб. Поздно вечером на улице, освещенной несколькими фонарями, пустынно' +
            ' и очень тихо — местечко, кажется, замерло в ожидании...',
            tags: ['#DJ', '#PARTY', '#MUSIC'],
            img: 'http://www.bycard.by/newsuploads/new/2016/desember/bbbbt.jpg'
        },
        {
            id: (String)(++startID),
            title: '"Лыжная акробатика напоминает покер". Как фристайлист Гладченко шел к первойкубковой медали.',
            summary: 'В феврале 2017 года Станислав Гладченко впервые стал призером этапа Кубка мира по фристайлу,' +
            ' атеперь готовится к турниру в Раубичах, где год назад был четвертым...',
            createdAt: new Date(2017, 2, 2),
            author: 'Иванов П. А.',
            content: 'В феврале 2017 года Станислав Гладченко впервые стал призером этапа Кубка мира по фристайлу,' +
            ' атеперь готовится к турниру в Раубичах, где год назад был четвертым. SPORT.TUT.BY рассказывает омолодом' +
            ' лидере белорусской команды по лыжной акробатике, который в перерывах между тренировками играет в покер на деньги...',
            tags: ['#SPORT', '#FREESTYLE', '#GOLDMEDAL'],
            img: 'http://img.mota.ru/upload/wallpapers/source/2013/01/25/13/04/34532/75aZAXyncQ.jpg'
        },
        {
            id: (String)(++startID),
            title: 'Самые ожидаемые новостройки 2017 года',
            summary: 'Появление на белорусском рынке квартир, построенных по московским нормам, вызвало немало перес' +
            'удов как среди потенциальных дольщиков, так и в широких кругах хоть и не обремененных...',
            createdAt: new Date(2017, 1, 25),
            author: 'Иванов П. А.',
            content: 'Появление на белорусском рынке квартир, построенных по московским нормам, вызвало немало перес' +
            'удов как среди потенциальных дольщиков, так и в широких кругах хоть и не обремененных жилищным вопросом' +
            ', но неравнодушных людей. Одни возмущались «продуманностью» застройщика и обвиняли его в том, что свои ' +
            'обязанности он перекладывает на плечи дольщиков...',
            tags: ['#ДИАДЕМА', '#DANATOWERS', '#VOGUE5A'],
            img: 'https://content.onliner.by/news/1400x5616/f88866c1e21093810a71412a5d34fe4a.jpeg'
        },
        {
            id: (String)(++startID),
            title: '«Таким, как я, нет места в рядах милиции». Второй день суда над бывшим руководителем ГАИ Баранов',
            summary: 'В среду продолжилось заседание суда над бывшим руководителем ГАИ Барановичского района. Андрей' +
            ' Волковыцкий обвиняется в том, что в пьяном виде совершил наезд на нерегулируемом пешеход',
            createdAt: new Date(2017, 1, 6),
            author: 'Иванов П. А.',
            content: 'В среду продолжилось заседание суда над бывшим руководителем ГАИ Барановичского района. Андрей' +
            ' Волковыцкий обвиняется в том, что в пьяном виде совершил наезд на нерегулируемом пешеходном переходе н' +
            'а женщину...',
            tags: ['#СУД', '#ГАИ', '#ДТП'],
            img: 'https://content.onliner.by/news/1400x5616/3d3473ca04c2f310c22cde3eca5de6f5.jpeg'
        },
        {
            id: (String)(++startID),
            title: 'Тест-драйв: выясняем, почему подорожал новый Hyundai Accent',
            summary: 'Знаете, почему Hyundai Solaris продается у нас как Accent? Когда эту модель только выводили на' +
            ' рынок, торговая марка Solaris в Беларуси была занята польским производителем автобусов...',
            createdAt: new Date(2013, 1, 28),
            author: 'Иванов П. А.',
            content: 'Знаете, почему Hyundai Solaris продается у нас как Accent? Когда эту модель только выводили на' +
            ' рынок, торговая марка Solaris в Беларуси была занята польским производителем автобусов. Попытки Hyunda' +
            'i заполучить название не увенчались успехом, поэтому теперь...',
            tags: ['#ACCENT', '#ТЕСТ-ДРАЙВ'],
            img: 'https://content.onliner.by/news/1400x5616/fed44221b349fbc6c5c870fb6a19d64a.jpeg'
        },
        {
            id: (String)(++startID),
            title: 'Предприниматель Константин Костюченко: когда в Беларуси исчезнет дикий вейпинг?',
            summary: 'Радуют ли вас бородатые хипстеры, решившие показать силу своих легких на автобусной остановке ' +
            'и окутывающие ее плотным паровым облаком от электронной сигареты? Как вы относитесь...',
            createdAt: new Date(2017, 2, 5),
            author: 'Иванов П. А.',
            content: 'Радуют ли вас бородатые хипстеры, решившие показать силу своих легких на автобусной остановке ' +
            'и окутывающие ее плотным паровым облаком от электронной сигареты? Как вы относитесь к школьникам, вовсю' +
            ' использующим парогенераторы, «патаму што безвредно»? Как вообще вы относитесь к...',
            tags: ['#ВЕЙПИНГ', '#КОНСТАНТИНКОСТЮЧЕНКО'],
            img: 'https://content.onliner.by/news/1400x5616/5729519713842fe08cd4ec45e897115a.jpeg'
        },
        {
            id: (String)(++startID),
            title: 'Пешеход вышел на переход слишком рано и попытался задержать проезжавшую машину',
            summary: 'Автомобилист решил проскочить на желтый сигнал светофора, что запрещено ПДД, а мужчина стал пе' +
            'реходить проезжую часть в тот момент, когда для него еще горел красный. Аварии удалось...',
            createdAt: new Date(2014, 8, 28),
            author: 'Иванов П. А.',
            content: 'Автомобилист решил проскочить на желтый сигнал светофора, что запрещено ПДД, а мужчина стал пе' +
            'реходить проезжую часть в тот момент, когда для него еще горел красный. Аварии удалось избежать, однако' +
            ' движение машины вызвало у пешехода негодование...',
            tags: ['#НАГЛЫЕВОДИТЕЛИ', '#СПРАВЕДЛИВОСТЬ'],
            img: 'https://i.ytimg.com/vi_webp/2JDMNzvdq_M/maxresdefault.webp'
        },
        {
            id: (String)(++startID),
            title: 'Фотофакт: проект Kino-mo белорусских разработчиков засветился на выставке MWC',
            summary: 'Проект Kino-mo, у истоков которого стоят белорусы Артем Ставенко и Кирилл Чикеюк, а офисы комп' +
            'ании размещаются в Минске и Лондоне, добрался до выставки MWC 2017 в Барселоне...',
            createdAt: new Date(2010, 9, 28),
            author: 'Иванов П. А.',
            content: 'Проект Kino-mo, у истоков которого стоят белорусы Артем Ставенко и Кирилл Чикеюк, а офисы комп' +
            'ании размещаются в Минске и Лондоне, добрался до выставки MWC 2017 в Барселоне. График у ребят насыщенн' +
            'ый: они уже посетили CES, а в следующем месяце их ждут еще две крупные выставки — в Дюссельдорфе и Дубае...',
            tags: ['#MWC', '#KINO-MO'],
            img: 'https://content.onliner.by/news/970x485/c5bad31dfdaccfe63aa84f58dafdead3.jpeg'
        },
        {
            id: (String)(++startID),
            title: 'В России выпустят Nokia 3310 в титановом корпусе. Цена — $1500',
            summary: 'Ювелирный бренд Caviar анонсировал выход люксовых версий обновленного телефона Nokia 3310. Мод' +
            'ель, в названии которой появится приставка Titano, будет сделана в корпусе из закаленного...',
            createdAt: new Date(2017, 2, 2),
            author: 'Иванов П. А.',
            content: 'Ювелирный бренд Caviar анонсировал выход люксовых версий обновленного телефона Nokia 3310. Мод' +
            'ель, в названии которой появится приставка Titano, будет сделана в корпусе из закаленного пуленепробива' +
            'емого титана марки BT 23. Устройство получит керамические кнопки и декоративную гравировку а-ля «дамасс' +
            'кая сталь»...',
            tags: ['#NOKIA3310', '#CAVIAR', '#TITANO'],
            img: 'https://content.onliner.by/news/970x485/8c630f444b370abf2e373dca518524e0.jpeg'
        },
        {
            id: (String)(++startID),
            title: 'Лукашенко о ситуации в стране: В СМИ, чтобы не запугивать, мизер даем',
            summary: 'Александр Лукашенко подчеркивает важность сохранения мира и спокойной жизни граждан в стране и' +
            ' ориентирует властные органы на поддержание правопорядка в строгом соответствии с законам...',
            createdAt: new Date(2003, 2, 23),
            author: 'Адериха М. А.',
            content: '«Мы в состоянии сегодня сохранить мир и покой в нашей стране, и мы ничего и никого не боимся, — ' +
            'подчеркнул президент. — Давайте обсудим ситуацию, которая складывается. Меня очень беспокоит та информаци' +
            'я, которую я получаю. Это не тот объем, который мы даем в СМИ (уже чтобы не запугивать, мизер даем)».«Обсу' +
            'дим весь комплекс той информации и мероприятий, которые проведены в связи с нашей антитеррористической бор' +
            'ьбой, и сделаем соответствующие выводы. Никого, подчеркиваю, не запугивая, не пугая, будем действовать ров' +
            'но по закону», — отметил Александр Лукашенко...',
            tags: ['#ЛУКАШЕНКО', '#ПОПУЛЯРНОЕ', '#ПОЛИТИКА'],
            img: 'http://www.putin-today.ru/wp-content/uploads/2016/06/Jin7U4Ao41WtiYNV5RTT6WdAe6UHGuec.jpg'
        }
    ];

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

        articles.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });

        var newArticles = [];
        var index = 0;

        if (!filterConfig) {
            for (var i = skip; i < articles.length && i < top + skip; i++) {
                newArticles[index] = articles[i];
                index++;
            }
        } else {
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

    function findTag(tag, tags) {
        for (var j = 0; j < tag.length; j++) {
            for (var i = 0; i < tags.length; i++) {
                if (tag[j] === tags[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    function getArticle(id) {
        var index = isArticle(id);
        if (index === -1) {
            return null;
        } else {
            return articles[index];
        }
    }

    function isArticle(id) {
        var res = -1;
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id === id) {
                return i;
            }
        }
        return res;
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
        var index = isArticle(id);
        if (index === -1) {
            return false;
        } else {
            articles.splice(index, 1);
            return true;
        }
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
        articles = JSON.parse(localStorage.getItem("articles"));
        for (var i = 0; i < articles.length; i++) {
            articles[i].createdAt = new Date(articles[i].createdAt);
        }
    }

    function storageArticles() {
        localStorage.setItem("articles", JSON.stringify(articles));
        count = JSON.parse(localStorage.getItem("articles")).length;
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        replaceArticles: replaceArticles,
        storageArticles: storageArticles,
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
        if (articles) {
            return articles.map(function (article) {
                return renderArticle(article);
            });
        }
    }

    function renderArticle(article) {
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toDateString();
        template.content.querySelector('.tags-ul').innerHTML = '';
        for (var i = 0; i < article.tags.length; i++) {
            var newLi = document.createElement('li');
            newLi.innerHTML = article.tags[i];
            template.content.querySelector('.tags-ul').appendChild(newLi);
        }
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
    if (!localStorage.getItem("articles")) {
        articleModel.storageArticles();
    } else {
        count = JSON.parse(localStorage.getItem("articles")).length;
    }

    articleModel.replaceArticles();
    articleRenderer.init();
    renderArticles(0, amountLoadedArticles, filter);


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
    var key = JSON.parse(localStorage.getItem("articles")).length - amountLoadedArticles;
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
    //amountLoadedArticles = 0;
    startApp();
    addUserUI();
}

document.addEventListener('DOMContentLoaded', startApp);
console.log(articleModel.getArticles(0, 12));