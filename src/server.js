require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;

const search = require('./router/search')
app.use('/search', search)
//const server = http.createServer(app);
app.listen(port, () => {
    console.log("Aplicativo Rodando!")
});
