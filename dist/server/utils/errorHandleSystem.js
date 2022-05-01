"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const webhook = new discord_js_1.WebhookClient({
    id: process.env.ERROR_WEBHOOK_ID,
    token: process.env.ERROR_WEBHOOK_TOKEN,
});
process.on('uncaughtException', (err) => {
    webhook.send({
        embeds: [
            new discord_js_1.MessageEmbed()
                .setAuthor({ name: 'Lambda Bot Website|API Process' })
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle('**[ERROR]** Uncaught Exception')
                .setDescription(err.stack?.substring(0, 4096) || `**${err.name}:** ${err.message}`.substring(0, 4096)),
        ],
    }).catch((e) => console.log(e));
    console.log(err);
});
process.on('unhandledRejection', (err, promise) => {
    webhook.send({
        embeds: [
            new discord_js_1.MessageEmbed()
                .setAuthor({ name: 'Lambda Bot Website|API Process' })
                .setColor('#2f3136')
                .setTimestamp()
                .setTitle('**[ERROR]** Unhandled Rejection')
                .setDescription(err.stack?.substring(0, 4096) || err.name && err.message ? `**${err.name}:** ${err.message}`.substring(0, 4096) : `Process could not handle promise.\n\`\`\`${promise}\`\`\``.substring(0, 4096)),
        ]
    }).catch((e) => console.log(e));
    console.log(err);
});
