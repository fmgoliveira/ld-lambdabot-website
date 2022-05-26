"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const schemas_1 = require("../../database/schemas");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const router = (0, express_1.Router)();
router.post("/webhook", body_parser_1.default.json(), async (req, res) => {
    if (!req.headers.authorization || (req.headers.authorization !== process.env.DONATING_WEBHOOK_TOKEN))
        return res.sendStatus(403);
    res.sendStatus(200);
    if (!req.body)
        return;
    const { txn_id, status, recurring, buyer_email, price, currency, raw_buyer_id, role_id, guild_id, } = req.body;
    if (guild_id !== process.env.LAMBDA_GUILD_ID)
        return;
    const timestamp = Date.now();
    const isSubscription = status === 'Completed' && recurring === '1' && role_id === process.env.PREMIUM_ROLE;
    const isSubscriptionEnd = status === 'sub_ended';
    const isLifetime = status === 'Completed' && recurring === '0' && role_id === process.env.DONATOR_ROLE;
    if (!isSubscription && !isSubscriptionEnd && !isLifetime)
        return;
    if (isSubscription)
        await schemas_1.Donator.create({
            buyerEmail: buyer_email,
            price: `${currency} ${price}`,
            timestamp,
            txn_id,
            type: 'subscription',
            userId: raw_buyer_id || undefined
        });
    if (isSubscriptionEnd)
        await schemas_1.Donator.findOneAndDelete({ userId: raw_buyer_id || undefined, roleId: process.env.PREMIUM_ROLE, type: 'subscription' });
    if (isLifetime)
        await schemas_1.Donator.create({
            buyerEmail: buyer_email,
            price: `${currency} ${price}`,
            timestamp,
            txn_id,
            type: 'lifetime',
            userId: raw_buyer_id || undefined
        });
});
exports.default = router;
