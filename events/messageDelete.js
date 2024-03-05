const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'messageDelete',
    execute(message) {
        if (message.author.bot) return;

        console.log(`Message deleted in #${message.channel.name || 'DM'}: "${message.content}" by ${message.author.tag}`);

        const historyFilePath = path.join(__dirname, '..', 'history', `${message.channel.id}history.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const historyContent = JSON.parse(data || '{}');

            historyContent[message.id] = {
                author: message.author.tag,
                content: message.content,
            };

            fs.writeFile(historyFilePath, JSON.stringify(historyContent, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    },
};
