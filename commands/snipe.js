const fs = require('fs');

module.exports = {
    name: 'snipe',
    description: 'snipe command',
    execute(message, args) {
        const snipeCount = args.length > 0 ? parseInt(args[0]) : 1;
        const channelId = message.channel.id;

        const messages = fs.readFileSync('history.txt', 'utf-8').trim().split('\n');

        const snipedMessages = messages
            .filter(msg => msg.endsWith(`:${channelId}`))
            .map(msg => msg.split(':').slice(2).join(':'))
            .slice(-snipeCount);

        if (snipedMessages.length === 0) {
            return message.channel.send('No deleted messages found in this channel\'s history.');
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
