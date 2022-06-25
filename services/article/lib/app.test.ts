const mongoMemoryServer = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require("supertest");

const appFunction = require("./app");

describe("Article Service", () => {
    let app;

    beforeAll(async () => {
        const mongoServer = await mongoMemoryServer.MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {dbName: "unitTest"}).then(() => {
            app = appFunction();
        });
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