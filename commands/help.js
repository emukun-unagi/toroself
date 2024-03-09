const { prefix } = require('../config.json'); // Make sure to adjust the path if needed

module.exports = {
    name: 'help',
    description: 'Display available commands',
    execute(message, args, commands) {
        const helpMessage = `**コマンド一覧:**\n\`\`\`\nBot: help,ping\nAi: gpt\nFun: miq\nOther: snipe\n\`\`\``;
        message.channel.send(helpMessage);
    },
};
