const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = {
    name: 'messageDelete',
    execute(message) {
        console.log(chalk.yellow('Message Deleted:'));
        console.log(`Author: ${message.author.tag}`);
        console.log(`Content: ${message.content}`);
        console.log('---');

        const historyFilePath = path.join(__dirname, `../history/${message.channel.id}history.txt`);

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            let history = '';

            if (!err) {
                history = data;
            }

            history += `${message.author.tag}: ${message.content}\n`;

            fs.writeFile(historyFilePath, history, (err) => {
                if (err) {
                    console.error(chalk.red(`Error writing to history file: ${err.message}`));
                } else {
                    console.log(chalk.green(`Message history saved successfully.`));
                }
            });
        });
    },
};
