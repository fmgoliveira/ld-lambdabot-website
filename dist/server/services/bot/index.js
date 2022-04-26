"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotStatusService = void 0;
const client_1 = require("../../client");
function getBotStatusService() {
    const guildCount = client_1.client.guilds.cache.size;
    const userCount = client_1.client.users.cache.size;
    const channelCount = client_1.client.channels.cache.size;
    const shardCount = client_1.client.shard?.count || 0;
    let memberCount = 0;
    client_1.client.guilds.cache.forEach(guild => {
        if (guild.members.cache.has(client_1.client.user.id))
            memberCount += guild.memberCount;
    });
    let memberCountStr = String(memberCount);
    let guildCountStr = String(guildCount);
    if (memberCountStr.length >= 4) {
        memberCountStr = `${memberCountStr.slice(0, -3)} K+`;
    }
    ;
    if (memberCountStr.length >= 7) {
        memberCountStr = `${memberCountStr.slice(0, -6)} M+`;
    }
    ;
    if (guildCountStr.length >= 4) {
        guildCountStr = `${guildCountStr.slice(0, -3)} K+`;
    }
    ;
    if (guildCountStr.length >= 7) {
        guildCountStr = `${guildCountStr.slice(0, -6)} M+`;
    }
    ;
    return {
        guildCount,
        userCount,
        channelCount,
        shardCount,
        memberCountStr,
        guildCountStr,
    };
}
exports.getBotStatusService = getBotStatusService;
