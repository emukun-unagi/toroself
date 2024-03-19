const fs = require('fs');
const path = require('path');
const Discord = require('discord.js-selfbot-v13');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
    name: 'make',
    description: 'make command',
    execute(message, args) {
        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
        const userID = message.author.id;

        if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
            const user = message.author;
            const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

            const content = args.join(' ');
            const avatarLink = encodeURIComponent(avatarURL);
            const name = encodeURIComponent(user.username);
            const tag = encodeURIComponent(user.tag);
            const contentEncoded = encodeURIComponent(content);
            const apiUrl = `https://miq-api.onrender.com/type=color&name=${name}&id=${tag}&icon=${avatarLink}&content=${contentEncoded}`;

            const replyMessage = `User: ${user.tag}\nAvatar: ${avatarURL}\nContent: ${content}\nAPI URL: ${apiUrl}`;

            message.channel.send(replyMessage)
                .catch(err => {
                    console.error('Error sending message:', err);
                });
        }
    },
};
