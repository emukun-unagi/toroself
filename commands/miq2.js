const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

module.exports = {
    name: 'miq2',
    description: 'Send specified user information and message to miq-api for +miq2',
    async execute(message, args) {
        if (message.author.bot) return;

        if (args.length < 2) {
            return message.channel.send('Please provide the user mention, ID, or tag, and the message content.');
        }

        const userIdentifier = args[0];
        const content = args.slice(1).join(' ');

        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first() || await message.client.users.fetch(userIdentifier.slice(2, -1)).catch(() => null);
        } else {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        }

        if (!user) {
            return message.channel.send('Unable to find the specified user.');
        }

        const name = user.nickname || user.username;

        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(content)}`;

        message.channel.send(miqApiUrl);
    },
};
