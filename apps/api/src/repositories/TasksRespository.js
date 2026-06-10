"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
var database_1 = require("../database");
var Task_1 = require("../models/Task");

var TasksRepository = function () { return database_1.AppDataSource.getRepository(Task_1.Task); };
exports.TasksRepository = TasksRepository;
