const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (!message.author) return;
        if (message.author.bot) return;

        const logMessage = `${message.author.id}:${message.channel.id}:${message.content}`;

        // Log to console
        console.log(chalk.red('Deleted Message:'), logMessage);

        // Log to history.txt
        fs.appendFileSync('history.txt', `${logMessage}\n`);
    },
};
