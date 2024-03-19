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
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Make Command')
                .setAuthor(user.tag, avatarURL)
                .setDescription(content);

            const avatarLink = encodeURIComponent(avatarURL);
            const name = encodeURIComponent(user.username);
            const tag = encodeURIComponent(user.tag);
            const contentEncoded = encodeURIComponent(content);
            const apiUrl = `https://miq-api.onrender.com/type=color&name=${name}&id=${tag}&icon=${avatarLink}&content=${contentEncoded}`;

            message.channel.send(embed)
                .then(() => {
                    message.channel.send(apiUrl);
                })
                .catch(err => {
                    console.error('Error sending message:', err);
                });
        }
    },
};
