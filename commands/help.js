const { prefix } = require('../config.json'); // Make sure to adjust the path if needed

module.exports = {
    name: 'help',
    description: 'Display available commands',
    execute(message, args, commands) {
        const helpMessage = `**コマンド一覧:**\n\`\`\`\n` +
            `BOT: help, ping\n` +
            `AI: gpt\n` +
            `情報: server\n` +
            `楽しい: snipe, miq\n` +
            `\`\`\``;
        message.channel.send(helpMessage);
    },
};
