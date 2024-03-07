const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

module.exports = {
    name: 'miq2',
    description: 'Send specified user and message information to miq-api',
    async execute(message, args) {
        if (message.author.bot) return;

        const replyMessage = message.reference?.messageID
            ? await message.channel.messages.fetch(message.reference.messageID).catch(() => null)
            : null;

        if (!replyMessage) {
            return message.channel.send('Please reply to a message using +miq2.');
        }

        const user = replyMessage.author;
        const name = user.nickname || user.username;
        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(replyMessage.content)}`;

        message.channel.send(miqApiUrl);
    },
};
