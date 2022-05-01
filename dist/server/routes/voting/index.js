"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const schemas_1 = require("../../database/schemas");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/discordswebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.BOTSFORDISCORD_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { user, bot } = req.body;
    if (bot !== process.env.DISCORD_CLIENT_ID)
        return;
    const timestamp = Date.now();
    if ((await schemas_1.Vote.find({ userId: user })).length > 1)
        await schemas_1.Vote.create({
            userId: user,
            timestamp: timestamp + (await schemas_1.Vote.find({ userId: user })).length * 12 * 60 * 60 * 1000,
            list: "botsfordiscord",
        });
    else
        await schemas_1.Vote.create({
            userId: user,
            timestamp,
            list: "botsfordiscord",
        });
});
router.post("/topggwebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.TOP_GG_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { user, bot, type } = req.body;
    if (bot !== process.env.DISCORD_CLIENT_ID)
        return;
    if (type === "test")
        return;
    const timestamp = Date.now();
    if ((await schemas_1.Vote.find({ userId: user })).length > 1)
        await schemas_1.Vote.create({
            userId: user,
            timestamp: timestamp + (await schemas_1.Vote.find({ userId: user })).length * 12 * 60 * 60 * 1000,
            list: "topgg",
        });
    else
        await schemas_1.Vote.create({
            userId: user,
            timestamp,
            list: "topgg",
        });
});
router.post("/infinitybotswebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.INFINITY_BOTS_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { userID, botID, type } = req.body;
    if (botID !== process.env.DISCORD_CLIENT_ID)
        return;
    if (type === "TEST")
        return;
    const timestamp = Date.now();
    if ((await schemas_1.Vote.find({ userId: userID })).length > 1)
        await schemas_1.Vote.create({
            userId: userID,
            timestamp: timestamp + (await schemas_1.Vote.find({ userId: userID })).length * 12 * 60 * 60 * 1000,
            list: "infinitybots",
        });
    else
        await schemas_1.Vote.create({
            userId: userID,
            timestamp,
            list: "infinitybots",
        });
});
router.post("/discordlabswebhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.DISCORD_LABS_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { uid, bid, test } = req.body;
    if (bid !== process.env.DISCORD_CLIENT_ID)
        return;
    if (test)
        return;
    const timestamp = Date.now();
    if ((await schemas_1.Vote.find({ userId: uid })).length > 1)
        await schemas_1.Vote.create({
            userId: uid,
            timestamp: timestamp + (await schemas_1.Vote.find({ userId: uid })).length * 12 * 60 * 60 * 1000,
            list: "discordlabs",
        });
    else
        await schemas_1.Vote.create({
            userId: uid,
            timestamp,
            list: "discordlabs",
        });
});
exports.default = router;
