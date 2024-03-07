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
        console.log(`Author: ${message.author.tag}`);
        console.log(`Content: ${message.content}`);
        console.log(`Server: ${message.guild.name} (ID: ${message.guild.id})`);
        console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);
        console.log('------------------------------');

        const historyFilePath = path.join(__dirname, `../history/${message.channel.id}.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            history += `deleted ${message.author.tag}: ${message.content}\n`;

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
