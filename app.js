let fs = require('fs');
let express = require('express');
let app = express();

let db = require('diskdb');
db.connect('./db', ['articles']);

let bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

// app.get('/page/:link', function (request, response) {
//     fs.readFile('./public/' + request.params.link + '.html', 'utf8', function (error, file) {
//         if (error) {
//             console.log(error);
//         }
//         response.send(file);
//     })
// });

app.get('/articles', function (request, response) {
    response.json(db.articles.find());
});

app.get('/articles/:id', function (request, response) {
    response.json(db.articles.findOne({id: request.params.id}));
});

app.post('/articles', function (request, response) {
    response.json(db.articles.save(request.body));
});


app.delete('/articles/:id', function (request, response) {
    response.json(db.articles.remove({id: request.params.id}));
});

app.patch('/articles/', function (request, response) {
    response.json(db.articles.update({id: request.body.id}, request.body));
});

app.listen(app.get('port'), function () {
    console.log("Server started", app.get('port'));
});