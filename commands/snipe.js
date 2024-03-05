const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'snipe',
    description: 'snipe commands',
    execute(message, args) {
        const snipeCount = parseInt(args[0]) || 1;

        const historyFilePath = path.join(__dirname, `../history/${message.channel.id}history.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading history file: ${err}`);
                return message.channel.send('An error occurred while retrieving deleted messages.');
            }

            const messages = data.split('\n').filter(Boolean);
            const snipedMessages = messages.slice(-snipeCount);

            if (snipedMessages.length === 0) {
                return message.channel.send('No deleted messages found.');
            }

            const snipeContent = snipedMessages.join('\n');
            const snipeFileName = `deltedMessage.txt`;

            fs.writeFile(snipeFileName, snipeContent, (writeErr) => {
                if (writeErr) {
                    console.error(`Error writing snipe file: ${writeErr}`);
                    return message.channel.send('An error occurred while processing deleted messages.');
                }

                message.channel.send({
                    files: [{
                        attachment: snipeFileName,
                        name: snipeFileName,
                    }],
                });

                fs.unlink(snipeFileName, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(`Error deleting snipe file: ${unlinkErr}`);
                    }
                });
            });
        });
    },
};
