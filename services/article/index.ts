import article from "./lib/schema/article";

const mongoose = require('mongoose');

const { INIT_DATABASE = "articleDb", PORT = 3000 } = process.env;

const articleApp = require('./lib/app');

mongoose.connect(`mongodb://localhost:27017/${INIT_DATABASE}`).then(() => {
    articleApp().listen(PORT, () => {
        console.log(`Article service listening on port ${PORT}`);
    });
});

