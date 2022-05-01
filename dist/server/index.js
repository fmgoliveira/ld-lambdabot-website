"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("./client"));
require("./database");
const express_1 = require("express");
const routes_1 = tslib_1.__importDefault(require("./routes"));
require('./utils/errorHandleSystem');
console.log(`Running in ${process.env.ENV} mode.`);
const router = (0, express_1.Router)();
router.use('/', routes_1.default);
try {
    client_1.default.init();
}
catch (err) {
    console.log(err);
}
module.exports = router;
