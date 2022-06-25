import * as express from 'express';
import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core/lib/MongoMemoryServer";

const appFunction = require("../../lib/app");

export default class IntegrationHelper {
    public static appInstance: express.Application;

    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }
        const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri(), {dbName: "unitTest"}).then(() => {
            this.appInstance = appFunction();
        });
        return this.appInstance;
    }
}