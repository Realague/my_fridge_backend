import Article from "../schema/article";

const express = require("express");
const log = require("../logger")();

const doGet = () => (req, res) => {
    Article.find().then((results) => {
        log.info({results}, "Found Articles");
        res.send(results);
    }).catch(err => {
        log.err({ err }, "Failed to find Articles")
    });
};

const doPost = () => (req, res) => {
    const article = new Article(req.body);
    article.save()
        .then(() => {
            log.info({ article }, "Save successful");
            res.sendStatus(201);
        })
        .catch(err => {
            log.error({ err, article }, "Failed to insert article");
            res.sendStatus(500);
        });
};

module.exports = () => {
    const router = express.Router();

    router.get("/", doGet());
    router.post("/", doPost());

    return router;
};