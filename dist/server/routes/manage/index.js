"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manage_1 = require("../../controllers/manage");
const middlewares_1 = require("../../utils/middlewares");
const router = (0, express_1.Router)();
router.get('/:guildId/administration', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getAdministrationSettingsController);
router.post('/:guildId/administration', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postAdministrationSettingsController);
router.get('/:guildId/welcome', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getWelcomeSettingsController);
router.post('/:guildId/welcome', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postWelcomeSettingsController);
router.post('/:guildId/leave', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postLeaveSettingsController);
router.post('/:guildId/autoroles', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postAutorolesSettingsController);
router.get('/:guildId/tickets', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getTicketsSettingsController);
router.post('/:guildId/tickets', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postTicketsSettingsController);
router.get('/:guildId/moderation', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getModerationSettingsController);
router.post('/:guildId/moderation', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postModerationSettingsController);
router.post('/:guildId/alt-detection', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postAltDetectionSettingsController);
router.get('/:guildId/logging', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getLoggingSettingsController);
router.post('/:guildId/logging', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postLoggingSettingsController);
router.post('/:guildId/chat-filter', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postChatFilterSettingsController);
router.get('/:guildId/verification', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getVerificationSettingsController);
router.post('/:guildId/verification', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postVerificationSettingsController);
router.get('/:guildId/levels', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.getLevelsSettingsController);
router.post('/:guildId/levels', middlewares_1.isAuthenticated, middlewares_1.isAllowed, middlewares_1.storedGuildSetup, manage_1.postLevelsSettingsController);
exports.default = router;
