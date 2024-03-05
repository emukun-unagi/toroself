const fs = require('fs');
const { prefix } = require('../config.json');

module.exports = {
    name: 'snipe',
    description: 'Retrieve deleted messages from history.txt',
    execute(message, args) {
        if (!message.content.startsWith(prefix)) return;

        const snipeCount = args.length > 0 ? parseInt(args[0]) : 1;

        const messages = fs.readFileSync('history.txt', 'utf-8').trim().split('\n');

        const snipedMessages = messages.slice(-snipeCount);

        if (snipedMessages.length === 0) {
            return message.channel.send('No deleted messages found in history.');
        }

        const fileName = `sniped_messages_${new Date().toISOString()}.txt`;
        fs.writeFileSync(fileName, snipedMessages.join('\n'));

        message.channel.send({
            files: [{
                attachment: fileName,
                name: fileName,
            }],
        });
    },
};
