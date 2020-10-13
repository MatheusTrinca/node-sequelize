const express = require('express');
const path = require('path');
const db = require('./config/database');
const exphbs = require('express-handlebars');
const gigsRoute = require('./routes/gigs');

const app = express();

// Test DB
db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs({layoutsDir: 'views/layouts', defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');
//app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index', {layout: 'landing'});
})

// Gig routes
app.use('/gigs', gigsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on PORT ${PORT}`));