const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connections');
const path = require('path');
const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers });
const utils = require('./utils/authenticate')
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SquelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'darthvader',
    cookie: {
        //expires in 5 min of no activity
        expires: 300000
    },
    resave: false,
    // allows the session to reset its expiration time back to 5 min
    rolling: true,
    saveUntinitialized: true,
    store: new SquelizeStore({
        db: sequelize
    })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at port ${PORT}`));
});