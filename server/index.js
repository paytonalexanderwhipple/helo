require('dotenv').config();
const { SERVER_PORT, DB_STRING, SECRET } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ctrl = require('./controller.js');

const app = express();

// *** MIDDLEWARE *** //

app.use(express.json());
massive(DB_STRING)
    .then(db => {
        app.set('db', db);
    });
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
}));

// *** ENDPOINTS *** //

// ---> authentication
app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);
app.get('/auth/user', ctrl.getCurrentUser);
app.get('/auth/logout', ctrl.logout);
// ---> posts
app.post('/api/posts', ctrl.search);
app.get('/api/posts/:id', ctrl.readById);
app.post('/api/create-post', ctrl.create);

// *** IT CAN HEAR YOU *** //

app.listen(SERVER_PORT, () => console.log(`Listening on PORT: ${SERVER_PORT}`));