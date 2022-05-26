"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const DonatorSchema = new mongoose_1.Schema({
    userId: { type: String, required: false, default: "" },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    txn_id: { type: String, required: true },
    price: { type: String, required: true },
});
exports.default = mongoose_1.default.model('donators', DonatorSchema);
