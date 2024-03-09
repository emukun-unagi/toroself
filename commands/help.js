const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'help command',
    execute(message, args, commands) {
        const commandList = commands.map(command => `**${prefix}${command.name}**: ${command.description}`).join('\n');
        const helpMessage = `**コマンド一覧:**\n${commandList}`;
        message.reply(helpMessage);
    },
};
