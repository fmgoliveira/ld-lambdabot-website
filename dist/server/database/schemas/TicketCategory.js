"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const TicketCategorySchema = new mongoose_1.Schema({
    guildId: { type: String, required: true },
    categoryChannel: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
    maxTickets: { type: Number, required: false, default: 0 },
    supportRoles: { type: [String], required: false, default: [] },
    welcomeMessage: {
        type: {
            message: { type: String, required: false, default: '' },
            color: { type: String, required: false, default: '#000000' },
        }, required: false,
    },
    deleteOnClose: { type: Boolean, required: false, default: false },
    moveToClosedCategory: { type: Boolean, required: false, default: false },
});
exports.default = mongoose_1.default.model('ticketCategories', TicketCategorySchema);
