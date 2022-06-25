import * as express from "express";

import IntegrationHelper from "../helpers/integration-helper";

const mongoose = require('mongoose');
const request = require("supertest");

describe("Article Service", () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelper.getApp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it("It should list articles", async () => {
        const response = await request(app).get("/articles");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });

    it("It should add article", async () => {
        const response = await request(app).post("/articles").send({name: "test article", perishable: false, packingType: 0, category: mongoose.Types.ObjectId('4edd40c86762e0fb12000003')});

        expect(response.status).toBe(201);
    });
});