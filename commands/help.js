const { prefix } = require('../config.json');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Display available commands',
    execute(message, args, commands) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        const helpMessage = `**コマンド一覧:**\n\`\`\`\n` +
            `BOT: help, ping\n` +
            `AI: gpt\n` +
            `情報: server\n` +
            `楽しい: snipe, miq\n` +
            `オーナー: addition, delete\n` +
            `\`\`\``;
        message.reply(helpMessage);
    },
};
