const express = require('express');
const path = require('path');
const logger = require('./middelware/logger');
const members = require('./Members');
const exphbs = require('express-handlebars');

const app = express();

//Init Middleware
// app.use(logger)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Home Page Rout
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member APP',
    members,
  });
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server Running on port ${PORT}`);
});
