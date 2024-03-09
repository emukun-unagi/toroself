const fs = require('fs');
const path = require('path');
const { prefix } = require('../config.json');

const loadCommands = (commandsDir) => {
    const commands = [];

    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsDir, file));
        commands.push(command);
    }

    return commands;
};

const commandsDir = path.resolve(__dirname, 'commands');
const commands = loadCommands(commandsDir);

module.exports = {
    name: 'help',
    description: 'ヘルプコマンド',
    execute(message, args) {
        const commandList = commands.map(command => `**${prefix}${command.name}**: ${command.description}`).join('\n');
        const helpMessage = `**コマンド一覧:**\n${commandList}`;
        message.reply(helpMessage);
    },
};
