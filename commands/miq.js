const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

const cooldowns = new Map();

module.exports = {
    name: 'miq',
    description: 'Send specified user information and message to miq-api',
    cooldown: 30,
    async execute(message, args) {
        if (message.author.bot) return;

        if (cooldowns.has(message.author.id)) {
            const expirationTime = cooldowns.get(message.author.id) + (this.cooldown * 1000);

            if (Date.now() < expirationTime) {
                const timeLeft = (expirationTime - Date.now()) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before reusing the command.`);
            }
        }

        if (args.length < 2) {
            return message.channel.send('Please provide the user mention, ID, or tag, and the message content.');
        }

        const userIdentifier = args[0];
        const content = args.slice(1).join(' ');

        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first() || await message.client.users.fetch(userIdentifier.slice(2, -1)).catch(() => null);
        } else if (/^\d+$/.test(userIdentifier)) {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        } else if (message.guild) {
            const member = message.guild.members.cache.find((m) => m.user.tag === userIdentifier);
            user = member ? member.user : null;
        }

        if (!user) {
            return message.channel.send('Unable to find the specified user.');
        }

        const name = user.nickname || user.username;

        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(content)}`;

        message.channel.send(miqApiUrl);

        cooldowns.set(message.author.id, Date.now());
        setTimeout(() => cooldowns.delete(message.author.id), this.cooldown * 1000);
    },
};
