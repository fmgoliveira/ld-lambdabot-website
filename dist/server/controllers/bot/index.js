"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotStats = void 0;
const bot_1 = require("../../services/bot");
async function getBotStats(req, res) {
    try {
        const data = (0, bot_1.getBotStatusService)();
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400).send({ msg: "Error" });
    }
}
exports.getBotStats = getBotStats;
