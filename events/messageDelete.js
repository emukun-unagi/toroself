const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
    name: 'messageDelete',
    execute(message) {
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

        console.log('Message Deleted:');
        console.log(`Time: ${timestamp}`);

        if (message.author) {
            console.log(`Author: ${message.author.tag}`);
        } else {
            console.log(`Author not available (message deleted).`);
        }

        console.log(`Content: ${message.content}`);

        if (message.attachments.size > 0) {
            console.log(`Image URL: ${message.attachments.first().url}`);
        }

        console.log(`Server: ${message.guild.name} (ID: ${message.guild.id})`);
        console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);

        const historyFilePath = path.join(`./history/${message.channel.id}.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            if (message.attachments.size > 0) {
                history += `deleted ${message.author ? message.author.tag : 'Unknown Author'}: ${message.content.replace(/\n/g, ' ')} Image URL: ${message.attachments.first().url}\n`;
            } else {
                history += `deleted ${message.author ? message.author.tag : 'Unknown Author'}: ${message.content.replace(/\n/g, ' ')}\n`;
            }

            fs.writeFile(historyFilePath, history, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        fs.mkdirSync(path.dirname(historyFilePath), { recursive: true });
                        fs.writeFileSync(historyFilePath, history);
                        console.log(chalk.green(`History file created successfully.`));
                        console.log('----------------------------------------');
                    } else {
                        console.error(chalk.red(`Error writing to history file: ${err.message}`));
                        console.log('----------------------------------------');
                    }
                } else {
                    console.log(chalk.green(`Message history saved successfully.`));
                    console.log('----------------------------------------');
                }
            });
        });
    },
};
