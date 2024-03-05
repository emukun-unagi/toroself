const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');

module.exports = {
    name: 'snipe',
    description: 'Retrieve deleted messages from history',
    async execute(message, args) {
        // Check if the message is from a bot
        if (message.author.bot) return;

        // Get the number of messages to retrieve (default is 1)
        const count = args.length > 0 ? parseInt(args[0]) : 1;

        // Check if count is a valid positive integer
        if (isNaN(count) || count < 1) {
            return message.channel.send('Please provide a valid positive integer as the number of messages to retrieve.');
        }

        // Load history file based on the channel ID
        const historyFilePath = `./history/${message.channel.id}.txt`;

        // Read the history file
        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading history file: ${err}`);
                return message.channel.send('An error occurred while retrieving the deleted messages.');
            }

            // Split the file content into lines
            const messages = data.trim().split('\n');

            // Check if there are enough messages in the history
            if (messages.length < count) {
                return message.channel.send(`There are not enough deleted messages in the history. (Current count: ${messages.length})`);
            }

            // Get the desired number of messages
            const snipedMessages = messages.slice(-count);

            // Send the messages to the channel as a text file
            const attachment = new Discord.MessageAttachment(Buffer.from(snipedMessages.join('\n'), 'utf-8'), 'sniped_messages.txt');
            message.channel.send(`Sniped ${count} deleted message(s)`, attachment);
        });
    },
};
