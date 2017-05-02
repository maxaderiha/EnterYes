const fs = require('fs');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const SessionStore = require('connect-diskdb')(session);

const store = new SessionStore({path: './db', name: 'sessions'});

const app = express();

const db = require('diskdb');

db.connect('./db', ['articles', 'users']);

const bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/page/:link', (request, response) =>
    fs.readFile(`./public/pages/${request.params.link}.html`, 'utf8', (error, file) => {
        if (error) {
            console.log(error);
        }
        response.send(file);
    }));

app.get('/articles', (request, response) =>
    response.json(db.articles.find()));

app.get('/articles/:id', (request, response) =>
    response.json(db.articles.findOne({id: request.params.id})));

app.post('/articles', (request, response) =>
    response.json(db.articles.save(request.body)));


app.delete('/articles/:id', (request, response) =>
    response.json(db.articles.remove({id: request.params.id})));

app.patch('/articles/', (request, response) =>
    response.json(db.articles.update({id: request.body.id}, request.body)));

app.use(session({secret: 'secret', resave: false, saveUninitialized: true, store}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
    const error = user ? null : new Error('deserialize');
    done(error, user);
});

passport.use('login', new LocalStrategy({passReqToCallback: true},
    (req, username, password, done) => {
        const user = db.users.findOne({username});
        if (!user) {
            console.log(`User Not Found with username${username}`);
            return done(null, false, {message: 'user not found'});
        }
        if (password !== user.password) {
            console.log('Invalid Password');
            return done(null, false, {message: 'incorrect password'});
        }
        return done(null, user);
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
