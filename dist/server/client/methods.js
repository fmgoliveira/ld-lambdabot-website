"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForBotPermissionManageRole = exports.checkForBotPermissionInCategory = exports.checkForBotPermissionInChannel = void 0;
const _1 = require(".");
const checkForBotPermissionInChannel = async (channelId, permission, guildId) => {
    const member = _1.client.guilds.cache.get(guildId)?.me;
    const channel = await _1.client.channels.fetch(channelId);
    if (!channel)
        return 0;
    return member?.permissionsIn(channelId)?.has(permission) ? 2 : 1;
};
exports.checkForBotPermissionInChannel = checkForBotPermissionInChannel;
const checkForBotPermissionInCategory = async (categoryId, permission, guildId) => {
    const member = _1.client.guilds.cache.get(guildId)?.me;
    const channel = await _1.client.channels.fetch(categoryId);
    if (!channel)
        return 0;
    return member?.permissionsIn(categoryId)?.has(permission) ? 2 : 1;
};
exports.checkForBotPermissionInCategory = checkForBotPermissionInCategory;
const checkForBotPermissionManageRole = (roleId, guildId) => {
    const guild = _1.client.guilds.cache.get(guildId);
    if (!guild)
        return 0;
    const role = guild.roles.cache.find(r => r.id === roleId);
    if (!role)
        return 0;
    const rolePosition = role.position;
    if (guild.me?.permissions.has('MANAGE_ROLES') && rolePosition < guild.me?.roles.highest?.position)
        return 2;
    else
        return 1;
};
exports.checkForBotPermissionManageRole = checkForBotPermissionManageRole;
