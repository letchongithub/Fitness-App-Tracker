<<<<<<< HEAD
const express = require('express');
const app = express();
const expbs = require('express-handlebars');

app.engine('handlebars', expbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routing
app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(8080, () => {
    console.log('Server is starting at port ', 8080);
});
=======
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`app listing on port ${PORT}`));
});
>>>>>>> f9f70d96d73729ae9ddbcadd392e13ed7ddd0166
