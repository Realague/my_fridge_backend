

const express = require('express');
const bodyParser = require("body-parser");
const durationMw = require("./middlewares/duration.ts");
const errorMw = require("./middlewares/error");

const articles = require("./routes/articles")

const app = express();

app.use(bodyParser.json());
app.use(durationMw);

module.exports = () => {

    app.use(errorMw);

    app.use("/articles", articles());

    return app;
};

