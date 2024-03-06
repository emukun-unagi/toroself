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

        console.log(chalk.yellow('Message Updated:'));
        console.log(`Time: ${timestamp}`);
        console.log(`Author: ${newMessage.author.tag}`);
        console.log(`Old Content: ${oldMessage.content}`);
        console.log(`New Content: ${newMessage.content}`);
        console.log(`Server: ${newMessage.guild.name} (ID: ${newMessage.guild.id})`);
        console.log(`Channel: ${newMessage.channel.name} (ID: ${newMessage.channel.id})`);
        console.log('------------------------------');

        const historyFilePath = path.join(__dirname, `../history/${newMessage.channel.id}.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            history += `edited ${newMessage.author.tag}: ${oldMessage.content} -> ${newMessage.content}\n`;

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
