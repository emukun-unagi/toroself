const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const axios = require('axios');

module.exports = {
    name: 'miq',
    description: 'Send a message to miq-api with user information',
    async execute(message, args) {
        if (message.author.bot) return;

        const count = args.length > 0 ? parseInt(args[0]) : 1;

        if (isNaN(count) || count < 1) {
            return message.channel.send('Please provide a valid positive integer as the number of messages to retrieve.');
        }

        const historyFilePath = `./history/${message.channel.id}.txt`;

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading history file: ${err}`);
                return message.channel.send('An error occurred while retrieving the deleted messages.');
            }

            const messages = data.trim().split('\n');

            if (messages.length < count) {
                return message.channel.send(`There are not enough deleted messages in the history. (Current count: ${messages.length})`);
            }

            const snipedMessage = messages[messages.length - count];

            // ユーザーの情報を取得し、ニックネームを取得
            const user = message.mentions.users.first() || message.client.users.cache.get(args[1]) || message.author;
            const nickname = message.guild.members.cache.get(user.id)?.displayName || user.username;

            const miqUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(nickname)}&id=${user.tag}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png', dynamic: true, size: 64 }))}&content=${encodeURIComponent(snipedMessage)}`;

            // miqのURLを送信
            message.channel.send(miqUrl);
        });
    },
};
