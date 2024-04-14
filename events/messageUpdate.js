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

        if (newMessage.author) {
            console.log(`Author: ${newMessage.author.tag}`);
        } else {
            console.log('Author: Unknown (User not found)');
        }

        console.log(`Old Content: ${oldMessage.content}`);
        console.log(`New Content: ${newMessage.content}`);

        if (newMessage.attachments.size > 0) {
            console.log(`Image URL: ${newMessage.attachments.first().url}`);
        }

        console.log(`Server: ${newMessage.guild.name} (ID: ${newMessage.guild.id})`);
        console.log(`Channel: ${newMessage.channel.name} (ID: ${newMessage.channel.id})`);

        const historyFilePath = path.join(`./history/${newMessage.channel.id}.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            if (newMessage.attachments.size > 0) {
                history += `edited ${newMessage.author ? newMessage.author.tag : 'Unknown Author'}: ${oldMessage.content.replace(/\n/g, ' ')} -> ${newMessage.content.replace(/\n/g, ' ')} ImageURL: ${newMessage.attachments.first().url}\n`;
            } else {
                history += `edited ${newMessage.author ? newMessage.author.tag : 'Unknown Author'}: ${oldMessage.content.replace(/\n/g, ' ')} -> ${newMessage.content.replace(/\n/g, ' ')}\n`;
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
