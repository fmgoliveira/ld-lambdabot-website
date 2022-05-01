"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLevelsSettings = exports.getLevelsSettings = exports.postVerificationSettings = exports.getVerificationSettings = exports.postLoggingSettings = exports.getLoggingSettings = exports.postChatFilterSettings = exports.postAltDetectionSettings = exports.postModerationSettings = exports.getModerationSettings = exports.postTicketsSettings = exports.getTicketsSettings = exports.postAutorolesSettings = exports.postLeaveSettings = exports.postWelcomeSettings = exports.getWelcomeSettings = exports.postAdministrationSettings = exports.getAdministrationSettings = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const discord_js_3 = require("discord.js");
const client_1 = require("../../client");
const methods_1 = require("../../client/methods");
const schemas_1 = require("../../database/schemas");
const functions_1 = require("../../utils/functions");
const placeholderReplace_1 = tslib_1.__importDefault(require("../../utils/placeholderReplace"));
async function getAdministrationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.administration;
    const commands = guild.commands.administration;
    return { settings, commands };
}
exports.getAdministrationSettings = getAdministrationSettings;
async function postAdministrationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (!data)
        return null;
    if (data.settings.chatbot.enabled) {
        const errorArray = data.settings.chatbot.channels.map((channelId) => {
            const chatbotPerms = (0, methods_1.checkForBotPermissionInChannel)(channelId, "SEND_MESSAGES");
            if (chatbotPerms === 1)
                return true;
            else if (chatbotPerms === 2)
                return false;
        });
        if (errorArray.some((error) => error === true))
            return { error: "I don't have permission to send messages in at least one of the chatbot's specified channels." };
    }
    ;
    data.settings.autoreact.forEach(async (autoreactObj) => {
        const chatbotPerms = (0, methods_1.checkForBotPermissionInChannel)(autoreactObj.channel, "ADD_REACTIONS");
        if (chatbotPerms === 1)
            return { error: "I don't have permission to react to messages in at least one of the autoreact's specified channels." };
    });
    guild.modules.administration = data.settings;
    guild.commands.administration = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postAdministrationSettings = postAdministrationSettings;
async function getWelcomeSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const welcome = {
        settings: guild.modules.welcome,
    };
    const leave = {
        settings: guild.modules.leave,
    };
    const autoroles = {
        settings: guild.modules.autoroles,
    };
    return { welcome, leave, autoroles };
}
exports.getWelcomeSettings = getWelcomeSettings;
async function postWelcomeSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (!data)
        return null;
    const embed = (0, functions_1.validEmbed)(data.settings.embed);
    if (embed.error)
        return { error: embed.error };
    if (data.settings.enabled && !data.settings.channel)
        return { error: "You must specify a channel." };
    if (!data.settings.message && !data.settings.embed.enabled)
        return { error: "You must specify a message or an embed." };
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.welcome = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postWelcomeSettings = postWelcomeSettings;
async function postLeaveSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const embed = (0, functions_1.validEmbed)(data.settings.embed);
    if (embed.error)
        return { error: embed.error };
    if (data.settings.enabled && !data.settings.channel)
        return { error: "You must specify a channel." };
    if (!data.settings.message && !data.settings.embed.enabled)
        return { error: "You must specify a message or an embed." };
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.leave = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postLeaveSettings = postLeaveSettings;
async function postAutorolesSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const errorArray1 = data.settings.userRoles.map((role) => {
            const botPerms = (0, methods_1.checkForBotPermissionManageRole)(role, guildId);
            if (botPerms === 1)
                return true;
            else if (botPerms === 2)
                return false;
        });
        if (errorArray1.some((error) => error === true))
            return { error: "I don't have permission to manage at least one of the specified user roles." };
        const errorArray2 = data.settings.botRoles.map((role) => {
            const botPerms = (0, methods_1.checkForBotPermissionManageRole)(role, guildId);
            if (botPerms === 1)
                return true;
            else if (botPerms === 2)
                return false;
        });
        if (errorArray2.some((error) => error === true))
            return { error: "I don't have permission to manage at least one of the specified bot roles." };
    }
    ;
    guild.modules.autoroles = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postAutorolesSettings = postAutorolesSettings;
async function getTicketsSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.tickets;
    const ticketCategories = await schemas_1.TicketCategory.find({ guildId });
    const commands = guild.commands.tickets;
    return {
        settings: {
            ...settings,
            categories: ticketCategories.map((c) => ({
                categoryChannel: c.categoryChannel,
                label: c.label,
                maxTickets: c.maxTickets,
                supportRoles: c.supportRoles,
                welcomeMessage: c.welcomeMessage,
                deleteOnClose: c.deleteOnClose,
                moveToClosedCategory: c.moveToClosedCategory,
            })) || [],
        }, commands
    };
}
exports.getTicketsSettings = getTicketsSettings;
async function postTicketsSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.deletePanelMessage || !data.settings || !data.commands) {
        const panelMessage = guild.modules.tickets.panelMessage;
        if (panelMessage.id && panelMessage.channel) {
            const channel = client_1.client.channels.cache.get(panelMessage.channel);
            if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) {
                const message = await channel.messages.fetch(panelMessage.id);
                if (message)
                    message.deletable ? message.delete().catch((err) => console.log(err)) : null;
            }
        }
        ;
        guild.modules.tickets.panelMessage = {
            id: "",
            url: "",
            message: {
                title: "",
                description: "",
                color: "#000000",
                thumbnail: "",
                titleUrl: "",
                image: "",
                timestamp: false,
            },
            channel: "",
        };
        await guild.save();
        return { guild, error: null };
    }
    if (data.settings.enabled) {
        if (data.settings.logChannel) {
            const botHasPermissionsInLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
            if (botHasPermissionsInLogChannel === 0)
                return { error: "The log channel you specified is not valid." };
            if (botHasPermissionsInLogChannel === 1)
                return { error: "The bot does not have permission to send messages in the log channel you specified." };
        }
        ;
        if (data.settings.closedCategory) {
            const botHasPermissionsInClosedCategory = (0, methods_1.checkForBotPermissionInCategory)(data.settings.logChannel, "MANAGE_CHANNELS");
            if (botHasPermissionsInClosedCategory === 0)
                return { error: "The closed category you specified is not valid." };
            if (botHasPermissionsInClosedCategory === 1)
                return { error: "The bot does not have permission to manage channels in the closed category you specified." };
        }
        ;
        const botHasPermissionsInPanelMessageChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.panelMessage.channel, "SEND_MESSAGES");
        if (botHasPermissionsInPanelMessageChannel === 0)
            return { error: "The panel message channel you specified is not valid." };
        if (botHasPermissionsInPanelMessageChannel === 1)
            return { error: "The bot does not have permission to send messages in the panel message channel you specified." };
        if (data.settings.categories.length === 0)
            return { error: "You must specify at least one category." };
        if (data.settings.categories.length > 15)
            return { error: "You can only have a maximum of 15 categories." };
        const prevTicketCategories = (await schemas_1.TicketCategory.find({ guildId })).map((c) => ({
            categoryChannel: c.categoryChannel,
            label: c.label,
            maxTickets: c.maxTickets,
            supportRoles: c.supportRoles,
            welcomeMessage: {
                message: c.welcomeMessage.message,
                color: c.welcomeMessage.color,
            },
            deleteOnClose: c.deleteOnClose,
            moveToClosedCategory: c.moveToClosedCategory,
        }));
        if (data.updatePanelMessage || data.settings.categories !== prevTicketCategories) {
            data.settings.categories.forEach((category) => {
                const botHasPermissionsInCategoryChannel = (0, methods_1.checkForBotPermissionInCategory)(category.categoryChannel, "MANAGE_CHANNELS");
                if (botHasPermissionsInCategoryChannel === 0)
                    return { error: "The category channel you specified is not valid." };
                if (botHasPermissionsInCategoryChannel === 1)
                    return { error: "The bot does not have permission to manage channels in the category channel you specified." };
                if (category.welcomeMessage.message.length > 4096)
                    return { error: "The welcome message you specified is too long." };
                if (category.welcomeMessage.message.length < 1)
                    return { error: "The welcome message you specified is too short." };
                if (category.label.length > 80)
                    return { error: "The label you specified is too long. It can have a maximum of 80 characters." };
                if (category.label.length < 1)
                    return { error: "The label you specified is too short." };
            });
            const prevData = guild.modules.tickets;
            const channel = client_1.client.channels.cache.get(data.settings.panelMessage.channel);
            if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT')) {
                const embed = new discord_js_1.MessageEmbed()
                    .setTitle(data.settings.panelMessage.message.title)
                    .setDescription((0, placeholderReplace_1.default)(data.settings.panelMessage.message.description, { name: guild.guildName, id: guild.guildId }))
                    .setColor(parseInt(data.settings.panelMessage.message.color.replace('#', ''), 16));
                if (!data.settings.panelMessage.message.description)
                    return { error: "The panel message description cannot be empty." };
                if (data.settings.panelMessage.message.thumbnail)
                    embed.setThumbnail(data.settings.panelMessage.message.thumbnail);
                if (data.settings.panelMessage.message.titleUrl)
                    embed.setURL(data.settings.panelMessage.message.titleUrl);
                if (data.settings.panelMessage.message.image)
                    embed.setImage(data.settings.panelMessage.message.image);
                if (data.settings.panelMessage.message.timestamp)
                    embed.setTimestamp();
                await schemas_1.TicketCategory.deleteMany({ guildId });
                data.settings.categories.forEach(async (category) => {
                    await schemas_1.TicketCategory.create({
                        guildId,
                        categoryChannel: category.categoryChannel,
                        label: category.label,
                        maxTickets: category.maxTickets,
                        supportRoles: category.supportRoles,
                        welcomeMessage: {
                            message: category.welcomeMessage.message,
                            color: category.welcomeMessage.color,
                        },
                        deleteOnClose: category.deleteOnClose,
                        moveToClosedCategory: category.moveToClosedCategory,
                    });
                });
                let components = null;
                if ((await schemas_1.TicketCategory.find({ guildId })).length > 0) {
                    components = new discord_js_3.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                        .setCustomId('ticket-create')
                        .setPlaceholder('Select a Ticket Category')
                        .addOptions((await schemas_1.TicketCategory.find({ guildId })).map((category) => ({ label: category.label, value: String(category._id) }))));
                }
                ;
                const prevChannel = client_1.client.channels.cache.get(prevData.panelMessage.channel);
                if (prevChannel && (prevChannel.type === 'GUILD_NEWS' || prevChannel.type === 'GUILD_TEXT')) {
                    if (prevData.panelMessage.id) {
                        const oldMessage = await prevChannel.messages.fetch(prevData.panelMessage.id);
                        if (oldMessage)
                            oldMessage.deletable ? oldMessage.delete().catch((err) => console.log(err)) : null;
                    }
                    ;
                }
                ;
                if (!data.settings.panelMessage.id)
                    data.settings.panelMessage.id = guild.modules.tickets.panelMessage.id;
                if (!data.settings.panelMessage.url)
                    data.settings.panelMessage.url = guild.modules.tickets.panelMessage.url;
                try {
                    const message = await channel.send({
                        embeds: [embed],
                        components: components ? [components] : undefined,
                    });
                    data.settings.panelMessage.id = message.id;
                    data.settings.panelMessage.url = message.url;
                }
                catch (err) {
                    console.log(err);
                    return { error: "There was an error sending the panel message. Please make sure the bot has permissions and try again." };
                }
                ;
            }
            else
                return { error: "The panel message channel you specified is not valid." };
        }
        guild.modules.tickets = data.settings;
        guild.commands.tickets = data.commands;
        await guild.save();
        return { guild, error: null };
    }
    ;
}
exports.postTicketsSettings = postTicketsSettings;
;
async function getModerationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const moderation = {
        settings: guild.modules.moderation,
        commands: guild.commands.moderation,
    };
    const altDetection = {
        settings: guild.modules.altDetection,
    };
    const chatFilter = {
        settings: guild.modules.chatFilter,
    };
    return { moderation, altDetection, chatFilter };
}
exports.getModerationSettings = getModerationSettings;
async function postModerationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    guild.modules.moderation = data.settings;
    guild.commands.moderation = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postModerationSettings = postModerationSettings;
async function postAltDetectionSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The log channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified." };
    }
    ;
    guild.modules.altDetection = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postAltDetectionSettings = postAltDetectionSettings;
async function postChatFilterSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.logChannel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The log channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the log channel you specified." };
    }
    ;
    guild.modules.chatFilter = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postChatFilterSettings = postChatFilterSettings;
async function getLoggingSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.logging;
    return { settings };
}
exports.getLoggingSettings = getLoggingSettings;
async function postLoggingSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        if (data.settings.moderation.enabled && data.settings.moderation.channel) {
            const botHasPermissionsInModerationLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.moderation.channel, "SEND_MESSAGES");
            if (botHasPermissionsInModerationLogChannel === 0)
                return { error: "The log channel you specified for moderation logging is not valid." };
            if (botHasPermissionsInModerationLogChannel === 1)
                return { error: "The bot does not have permission to send messages in the log channel you specified for moderation logging." };
        }
        ;
        if (data.settings.serverEvents.enabled && data.settings.serverEvents.channel) {
            const botHasPermissionsInServerEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.serverEvents.channel, "SEND_MESSAGES");
            if (botHasPermissionsInServerEventsLogChannel === 0)
                return { error: "The log channel you specified for server events logging is not valid." };
            if (botHasPermissionsInServerEventsLogChannel === 1)
                return { error: "The bot does not have permission to send messages in the log channel you specified for server events logging." };
        }
        ;
        if (data.settings.memberEvents.enabled && data.settings.memberEvents.channel) {
            const botHasPermissionsInMemberEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.memberEvents.channel, "SEND_MESSAGES");
            if (botHasPermissionsInMemberEventsLogChannel === 0)
                return { error: "The log channel you specified for member events logging is not valid." };
            if (botHasPermissionsInMemberEventsLogChannel === 1)
                return { error: "The bot does not have permission to send messages in the log channel you specified for member events logging." };
        }
        ;
        if (data.settings.messageEvents.enabled && data.settings.messageEvents.channel) {
            const botHasPermissionsInMessageEventsLogChannel = (0, methods_1.checkForBotPermissionInChannel)(data.settings.messageEvents.channel, "SEND_MESSAGES");
            if (botHasPermissionsInMessageEventsLogChannel === 0)
                return { error: "The log channel you specified for message events logging is not valid." };
            if (botHasPermissionsInMessageEventsLogChannel === 1)
                return { error: "The bot does not have permission to send messages in the log channel you specified for message events logging." };
        }
        ;
    }
    ;
    guild.modules.logging = data.settings;
    await guild.save();
    return { guild, error: null };
}
exports.postLoggingSettings = postLoggingSettings;
async function getVerificationSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.verification;
    const commands = guild.commands.verification;
    return { settings, commands };
}
exports.getVerificationSettings = getVerificationSettings;
async function postVerificationSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        const embed = (0, functions_1.validEmbed)(data.settings.embed);
        if (embed.error)
            return { error: embed.error };
        if (data.settings.enabled && !data.settings.channel)
            return { error: "You must specify a channel." };
        if (!data.settings.message && !data.settings.embed.enabled)
            return { error: "You must specify a message or an embed." };
        if (data.settings.enabled && !data.settings.buttonLabel)
            return { error: "You must specify a button label." };
        if (data.settings.enabled && data.settings.buttonLabel.length > 80)
            return { error: "The button label must be 80 characters or less." };
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
        if (data.settings.sendPanel) {
            if (!data.settings.embed.enabled) {
                const channel = client_1.client.channels.cache.get(data.settings.channel);
                if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                    channel.send({
                        content: data.settings.message,
                        components: [
                            new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:verification_check:969285875219460126>')),
                        ],
                    }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
            }
            else {
                const channel = client_1.client.channels.cache.get(data.settings.channel);
                if (channel && (channel.type === 'GUILD_NEWS' || channel.type === 'GUILD_TEXT'))
                    channel.send({
                        embeds: [
                            {
                                title: data.settings.embed.title,
                                description: data.settings.embed.description,
                                color: parseInt(data.settings.embed.color.replace('#', ''), 16),
                                thumbnail: {
                                    url: data.settings.embed.thumbnail,
                                },
                                url: data.settings.embed.titleUrl,
                                author: {
                                    name: data.settings.embed.author.name,
                                    icon_url: data.settings.embed.author.icon_url,
                                    url: data.settings.embed.author.url,
                                },
                                image: {
                                    url: data.settings.embed.image,
                                },
                                footer: {
                                    text: data.settings.embed.footer.text,
                                    icon_url: data.settings.embed.footer.icon_url,
                                },
                            },
                        ],
                        components: [
                            new discord_js_3.MessageActionRow().addComponents(new discord_js_2.MessageButton().setLabel(data.settings.buttonLabel).setStyle('SUCCESS').setCustomId('verification-verify').setEmoji('<:verification_check:969285875219460126>')),
                        ],
                    }).catch((err) => { return { error: 'Could not send the verification panel message. Make sure the bot has permissions and try again.' }; });
            }
            ;
        }
        ;
    }
    ;
    data.settings.sendPanel = undefined;
    guild.modules.verification = data.settings;
    guild.commands.verification = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postVerificationSettings = postVerificationSettings;
async function getLevelsSettings(guildId) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    const settings = guild.modules.levels;
    const commands = guild.commands.levels;
    return { settings, commands };
}
exports.getLevelsSettings = getLevelsSettings;
async function postLevelsSettings(guildId, data) {
    const guild = await schemas_1.Guild.findOne({ guildId });
    if (!guild)
        return null;
    if (data.settings.enabled) {
        if (!data.settings.message)
            return { error: "You must specify a message to send on level up." };
        if (data.settings.message.length > 2000)
            return { error: "The message you specified is too long." };
    }
    ;
    if (data.settings.enabled && !['disabled', 'current', 'dm'].includes(data.settings.channel)) {
        const botHasPermissions = (0, methods_1.checkForBotPermissionInChannel)(data.settings.channel, "SEND_MESSAGES");
        if (botHasPermissions === 0)
            return { error: "The channel you specified is not valid." };
        if (botHasPermissions === 1)
            return { error: "The bot does not have permission to send messages in the channel you specified." };
    }
    ;
    guild.modules.levels = data.settings;
    guild.commands.levels = data.commands;
    await guild.save();
    return { guild, error: null };
}
exports.postLevelsSettings = postLevelsSettings;
