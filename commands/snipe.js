const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');

module.exports = {
    name: 'snipe',
    description: 'snipe command',
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

            const snipedMessages = messages.slice(-count);

            for (const snipedMessage of snipedMessages) {
                message.channel.send(snipedMessage);
            }
        });
    },
};
