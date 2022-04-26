"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForBotPermissionManageRole = exports.checkForBotPermissionInCategory = exports.checkForBotPermissionInChannel = void 0;
const _1 = require(".");
const checkForBotPermissionInChannel = (channelId, permission) => {
    const channel = _1.client.channels.cache.find(c => c.id === channelId && c.isText());
    if (!channel)
        return 0;
    if (channel.type !== 'GUILD_TEXT' && channel.type !== 'GUILD_NEWS')
        return 0;
    return channel.permissionsFor(process.env.DISCORD_CLIENT_ID)?.has(permission) ? 2 : 1;
};
exports.checkForBotPermissionInChannel = checkForBotPermissionInChannel;
const checkForBotPermissionInCategory = (categoryId, permission) => {
    const channel = _1.client.channels.cache.find(c => c.id === categoryId);
    if (!channel)
        return 0;
    if (channel.type !== 'GUILD_CATEGORY')
        return 0;
    return channel.permissionsFor(process.env.DISCORD_CLIENT_ID)?.has(permission) ? 2 : 1;
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
