const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./database');
const sessionStore = new SequelizeStore({ db: session });
sessionStore.sync();
const User = require('./user');
User.sync({ alter: true });

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: 'MySuperSecretPassportSession007',
    resave: false,
    saveUninitialized: true,
    name: 'testingpassport',
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  }),
  passport.initialize(),
  passport.session()
);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  req.session.passport ? res.render('index') : res.render('signup');
});

app.use(express.urlencoded({ extended: true });

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  req.login(user, err => {
    return res.redirect('/');
  });
});

app.listen(3001, () => console.log('Server ready'));

