const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Retrieve deleted messages from history',
    usage: 'snipe [count]',
    execute(message, args) {
        const count = args.length > 0 ? parseInt(args[0]) : 1;
        const channelID = message.channel.id;
        const historyFilePath = `./history/${channelID}.txt`;

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading history file: ${err}`);
                message.channel.send('An error occurred while reading history.');
                return;
            }

            const messages = data.trim().split('\n').reverse();

            const snipedMessages = messages.slice(0, count).join('\n');

            if (snipedMessages) {
                const attachment = new MessageAttachment(Buffer.from(snipedMessages), 'sniped_messages.txt');
                message.channel.send(`Sniped ${count} message(s):`, attachment);
            } else {
                message.channel.send('No messages found in history.');
            }
        });
    },
};
