const fs = require('fs');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const SessionStore = require('connect-mongo')(session);
const Users = require('./db.js').users;
const Articles = require('./db.js').articles;

const store = new SessionStore({url: 'mongodb://localhost/maxaderiha'});
const app = express();
const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/page/:link', (request, response) =>
    fs.readFile(`./public/pages/${request.params.link}.html`, 'utf8', (error, file) => {
        if (error) {
            console.log(error);
        }
        response.send(file);
    }));

app.get('/articles', (request, response) => {
    Articles.find((err, data) => !err ? response.json(data) : response.sendStatus(500));
});

app.put('/articles', (request, response) => {
    const filter = {};
    if (request.body.filter) {
        if (request.body.filter.tags) {
            filter.tags = {$all: request.body.filter.tags};
        }
        if (request.body.filter.createdAt) {
            filter.createdAt = {
                $gte: new Date(request.body.filter.createdAt),
                $lt: new Date(new Date(request.body.filter.createdAt).getTime()
                    + (24 * 3600 * 1000))
            };
        }
        if (request.body.filter.author) {
            filter.author = request.body.filter.author;
        }
    }
    Articles.find(filter)
        .skip(request.body.skip || 0)
        .limit(request.body.top || 10)
        .sort({createdAt: -1})
        .exec((err, data) => !err ? response.json(data) : response.sendStatus(500));
});

app.get('/articles/:id', (request, response) => {
    Articles.findById(request.params.id,
        (err, data) => !err ? response.json(data) : response.sendStatus(500));
});

app.post('/articles', (request, response) => {
    new Articles(request.body).save(
        err => !err ? response.sendStatus(200) : response.sendStatus(500));
});

app.delete('/articles/:id', (request, response) =>
    Articles.findByIdAndRemove(request.params.id,
        err => !err ? response.sendStatus(200) : response.sendStatus(500)));

app.patch('/articles/', (request, response) =>
    Articles.findByIdAndUpdate(request.body.id, {$set: request.body},
        err => !err ? response.sendStatus(200) : response.sendStatus(500)));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user);
});

passport.use('login', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        Users.findOne({username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log(`User Not Found with username${username}`);
                return done(null, false, {message: 'user not found'});
            }
            if (password !== user.password) {
                console.log('Invalid Password');
                return done(null, false, {message: 'incorrect password'});
            }
            done(null, user);
        });
    }));

app.post('/login', passport.authenticate('login'), (req, res) => res.sendStatus(200));

app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.get('/username', (req, res) =>
    (req.user ? res.send(req.user.username) : res.sendStatus(401)));

app.listen(app.get('port'), () => {
    console.log('Server started', app.get('port'));
});
