const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
    name: 'messageUpdate',
    execute(oldMessage, newMessage) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tokyo',
        };

        const timestamp = new Date().toLocaleString('ja-JP', options);

        console.log('Message Updated:');
        console.log(`Time: ${timestamp}`);
        console.log(`Author: ${newMessage.author.tag}`);
        console.log(`Old Content: ${oldMessage.content}`);
        console.log(`New Content: ${newMessage.content}`);

        // Check if the new message contains attachments (images)
        if (newMessage.attachments.size > 0) {
            console.log(`Image URL: ${newMessage.attachments.first().url}`);
        }

        console.log(`Server: ${newMessage.guild.name} (ID: ${newMessage.guild.id})`);
        console.log(`Channel: ${newMessage.channel.name} (ID: ${newMessage.channel.id})`);
        console.log('------------------------------');

        const historyFilePath = path.join(__dirname, `../history/${newMessage.channel.id}.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            if (newMessage.attachments.size > 0) {
                // If message contains attachments, include image URL in history
                history += `edited ${newMessage.author.tag}: ${oldMessage.content} -> ${newMessage.content} (Image URL: ${newMessage.attachments.first().url})\n`;
            } else {
                history += `edited ${newMessage.author.tag}: ${oldMessage.content} -> ${newMessage.content}\n`;
            }

            fs.writeFile(historyFilePath, history, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        fs.mkdirSync(path.dirname(historyFilePath), { recursive: true });
                        fs.writeFileSync(historyFilePath, history);
                        console.log(chalk.green(`History file created successfully.`));
                    } else {
                        console.error(chalk.red(`Error writing to history file: ${err.message}`));
                    }
                } else {
                    console.log(chalk.green(`Message history saved successfully.`));
                }
            });
        });
    },
};
