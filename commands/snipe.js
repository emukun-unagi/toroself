const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');

module.exports = {
    name: 'snipe',
    description: 'snipe command',
    async execute(message, args) {
        if (message.author.bot) return;

        const count = args.length > 0 ? parseInt(args[0]) : 1;

        if (isNaN(count) || count < 1) {
            return message.reply('取得するメッセージの数として、有効な正の整数を入力してください。');
        }

        const historyFilePath = `./history/${message.channel.id}.txt`;

        fs.readFile(historyFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading history file: ${err}`);
                return message.reply('削除されたメッセージの取得中にエラーが発生しました。');
            }

            const messages = data.trim().split('\n');

            if (messages.length < count) {
                return message.reply(`履歴には十分な削除されたメッセージがありません。(現在のカウント: ${messages.length})`);
            }

            const snipedMessage = messages[messages.length - count];

            message.reply(snipedMessage);
        });
    },
};
