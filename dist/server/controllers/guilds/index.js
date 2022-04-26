"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembers = exports.getRoles = exports.getCategories = exports.getChannels = exports.getGuild = exports.getGuildsController = void 0;
const guilds_1 = require("../../services/guilds");
async function getGuildsController(req, res) {
    const user = req.user;
    try {
        const guilds = await (0, guilds_1.getMutualGuildsService)(user.id);
        res.status(200).send({ guilds });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400).send({ msg: "Error" });
    }
}
exports.getGuildsController = getGuildsController;
async function getGuild(req, res) {
    const user = req.user;
    const guildId = req.params.guildId;
    const { data: guilds } = await (0, guilds_1.getUserGuildsService)(user.id);
    const guild = guilds.filter((g) => g.id === guildId)[0];
    res.status(200).send(guild);
}
exports.getGuild = getGuild;
async function getChannels(req, res) {
    const guildId = req.params.guildId;
    const channels = await (0, guilds_1.getGuildChannels)(guildId);
    res.status(200).send(channels);
}
exports.getChannels = getChannels;
async function getCategories(req, res) {
    const guildId = req.params.guildId;
    const channels = await (0, guilds_1.getGuildCategories)(guildId);
    res.status(200).send(channels);
}
exports.getCategories = getCategories;
async function getRoles(req, res) {
    const guildId = req.params.guildId;
    const roles = await (0, guilds_1.getGuildRoles)(guildId);
    res.status(200).send(roles);
}
exports.getRoles = getRoles;
async function getMembers(req, res) {
    const guildId = req.params.guildId;
    const members = await (0, guilds_1.getGuildMembers)(guildId);
    res.status(200).send(members);
}
exports.getMembers = getMembers;
