import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./entities/Admin";
import { Resource } from "./entities/Resource";
import { Submission } from "./entities/Submission";
import { AnalyticsEvent } from "./entities/AnalyticsEvent";
import { Settings } from "./entities/Settings";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: process.env.NODE_ENV === "development",
    logging: process.env.NODE_ENV === "development",
    entities: [Admin, Resource, Submission, AnalyticsEvent, Settings],
    migrations: [],
    subscribers: [],
});

let isInitialized = false;

export const getDataSource = async () => {
    if (!isInitialized) {
        try {
            await AppDataSource.initialize();
            isInitialized = true;
            console.log("Data Source has been initialized!");
        } catch (err) {
            console.error("Error during Data Source initialization", err);
            throw err;
        }
    }
    return AppDataSource;
};
