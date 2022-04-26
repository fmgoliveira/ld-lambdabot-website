if (process.env.ENV !== 'production') {
  require("dotenv").config();
};
const express = require('express');
const path = require('path');
const session = require("express-session");
const passport = require("passport")
const serverRouter = require("./server");
const store = require("connect-mongo");

require('./server/strategies/discord');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
  secret: 'FJFGYYTrc56ub7v76ikiuY67IHGc-67IC5Ci7jU56C54ckuyU6-5VJYGfi76l7IX6I5',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60 * 24 * 7,
  },
  store: store.create({ mongoUrl: process.env.MONGO_URL }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', serverRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


app.listen(process.env.PORT);