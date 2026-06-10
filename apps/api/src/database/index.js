"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var Task_1 = require("../models/Task");
var CreateTasks_1 = require("./migrations/1613763964003-CreateTasks");

var AppDataSource = new typeorm_1.DataSource({
    type: "better-sqlite3",
    database: process.env.NODE_ENV === "test"
        ? "./src/database/database.test.sqlite"
        : "./src/database/database.sqlite",
    migrations: [CreateTasks_1.CreateTasks1613763964003],
    entities: [Task_1.Task],
});
exports.AppDataSource = AppDataSource;

exports.default = function () { return AppDataSource.initialize(); };
