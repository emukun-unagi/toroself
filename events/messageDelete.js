const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'messageDelete',
    execute(message) {
        console.log(`Message deleted in ${message.channel.name}: ${message.content} by ${message.author.tag}`);

        const historyFilePath = path.join(__dirname, `../history/${message.channel.id}history.txt`);
        const logMessage = `${message.author.tag}: ${message.content}\n`;

        fs.appendFile(historyFilePath, logMessage, (err) => {
            if (err) {
                console.error(`Error writing to history file: ${err}`);
            }
        });
    },
}
