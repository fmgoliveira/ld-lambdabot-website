"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const TicketCategorySchema = new mongoose_1.Schema({
    guildId: { type: String, required: true },
    categoryChannel: { type: String, required: true },
    label: { type: String, required: true },
    maxTickets: { type: Number, required: true },
    supportRoles: { type: [String], required: true },
    welcomeMessage: {
        type: {
            message: { type: String, required: true },
            color: { type: String, required: true },
        }, required: true
    },
    deleteOnClose: { type: Boolean, required: true },
    moveToClosedCategory: { type: Boolean, required: true },
});
exports.default = mongoose_1.default.model('ticketCategories', TicketCategorySchema);
