const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const path = require('path');
const config = require('../config.json');

module.exports = {
  name: 'snipe',
  description: 'snipe command',
  async execute(message, args) {
    const userID = message.author.id;

    const whitelistPath = path.join(__dirname, '../whitelist.json');
    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

    if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
      return;
    }

    if (message.author.bot) return;

    let targetUser = args[0];
    let count = 1;

    if (args.length > 1) {
      count = parseInt(args[1]);
    }

    if (isNaN(count) || count < 1) {
      return message.reply('取得するメッセージの数として、有効な正の整数を入力してください。');
    }

    if (targetUser) {
      targetUser = targetUser.replace(/<@!?(\d+)>/, '$1');
    } else {
      targetUser = message.author.id;
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

      let snipedMessage = null;

      for (let i = messages.length - 1; i >= 0 && snipedMessage === null; i--) {
        const messageLine = messages[i];

        if (messageLine.startsWith(`deleted by ${targetUser}`) || messageLine.startsWith(`edited by ${targetUser}`)) {
          snipedMessage = messageLine;

          for (let j = 1; j < count && i - j >= 0; j++) {
            if (messages[i - j].startsWith(`deleted by ${targetUser}`) || messages[i - j].startsWith(`edited by ${targetUser}`)) {
              snipedMessage = messages[i - j];
            }
          }
        }
      }

      if (snipedMessage === null) {
        return message.reply(`${chalk.red('エラー')}: 指定されたユーザーのメッセージ履歴には十分な削除されたメッセージがありません。`);
      }

      message.reply(snipedMessage);
    });
  },
};
