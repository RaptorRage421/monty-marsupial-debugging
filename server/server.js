const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const koalaRouter = require('./routes/koala.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter)


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Connected on Port: ${PORT}`);
});
