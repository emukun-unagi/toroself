const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!message.author) return;
        if (message.author.bot) return;

        const logMessage = `${message.author.id}:${message.channel.id}:${message.content}`;

        console.log(chalk.red('Deleted Message:'), logMessage);

        fs.appendFileSync('history.txt', `${logMessage}\n`);
    },
};
