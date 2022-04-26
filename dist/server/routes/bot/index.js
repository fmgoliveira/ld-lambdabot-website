"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bot_1 = require("../../controllers/bot");
const router = (0, express_1.Router)();
router.get('/stats', bot_1.getBotStats);
exports.default = router;
