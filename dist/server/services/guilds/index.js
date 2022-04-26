"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuildMembers = exports.getGuildRoles = exports.getGuildCategories = exports.getGuildChannels = exports.getMutualGuildsService = exports.getUserGuildsService = exports.getBotGuildsService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const schemas_1 = require("../../database/schemas");
const constants_1 = require("../../utils/constants");
function getBotGuildsService() {
    return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }
    });
}
exports.getBotGuildsService = getBotGuildsService;
async function getUserGuildsService(id) {
    const user = await schemas_1.User.findById(id);
    if (!user)
        throw new Error('No user found');
    return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    });
}
exports.getUserGuildsService = getUserGuildsService;
async function getMutualGuildsService(id) {
    const { data: botGuilds } = await getBotGuildsService();
    const { data: userGuilds } = await getUserGuildsService(id);
    let guildArray = userGuilds.map((guild) => guild);
    guildArray.forEach((guild) => {
        guild.botIn = botGuilds.some((g) => g.id === guild.id);
        if (guild.owner)
            return guild.role = 'owner';
        if (((parseInt(guild.permissions) & 0x8) === 0x8))
            return guild.role = 'admin';
        if (((parseInt(guild.permissions) & 0x20) === 0x20))
            return guild.role = 'manager';
        return guild.role = 'none';
    });
    return guildArray.filter((guild) => guild.role !== 'none');
}
exports.getMutualGuildsService = getMutualGuildsService;
async function getGuildChannels(guildId) {
    const { data: channels } = await axios_1.default.get(`${constants_1.DISCORD_API_URL}/guilds/${guildId}/channels`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
    });
    return channels.filter((channel) => [0, 5].includes(channel.type));
}
exports.getGuildChannels = getGuildChannels;
async function getGuildCategories(guildId) {
    const { data: channels } = await axios_1.default.get(`${constants_1.DISCORD_API_URL}/guilds/${guildId}/channels`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
    });
    return channels.filter((channel) => channel.type === 4);
}
exports.getGuildCategories = getGuildCategories;
async function getGuildRoles(guildId) {
    const { data: roles } = await axios_1.default.get(`${constants_1.DISCORD_API_URL}/guilds/${guildId}/roles`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
    });
    return roles;
}
exports.getGuildRoles = getGuildRoles;
async function getGuildMembers(guildId) {
    let members = [];
    let membersFetch = [];
    let after;
    do {
        membersFetch = (await axios_1.default.get(`${constants_1.DISCORD_API_URL}/guilds/${guildId}/members?limit=1000${after ? "&after=" + after : ""}`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            },
        })).data;
        after = membersFetch[membersFetch.length - 1].user?.id;
        members.push(...membersFetch);
    } while (membersFetch.length === 1000);
    return members;
}
exports.getGuildMembers = getGuildMembers;
