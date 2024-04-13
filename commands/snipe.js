const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
  name: 'snipe',
  description: 'snipe command',
  execute(message, args) {
    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
    const userID = message.author.id;

    if (isNaN(args[0])) {
      message.reply('Please specify a number.');
      return;
    }

    const num = parseInt(args[0]);
    const historyPath = `./history/${message.channel.id}.txt`;

    if (!fs.existsSync(historyPath)) {
      message.reply('No message history found.');
      return;
    }

    const history = fs.readFileSync(historyPath, 'utf8').split('ーーーーーーーーーーーーーーーーーー\n');

    if (num > history.length || num < 1) {
      message.reply('Invalid number.');
      return;
    }

    if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
      const historyItem = history[history.length - num].split('\n');
      let response = '';

      for (let i = 1; i < historyItem.length; i++) {
        const line = historyItem[i];
        if (line.startsWith('deleted by')) {
          response += `Deleted message:\n${line.substring(line.indexOf(':') + 1)}\n`;
        } else if (line.startsWith('edited by')) {
          response += `Original message:\n${line.substring(line.indexOf(':') + 1)}\n`;
          response += `Edited message:\n${historyItem[i + 1].substring(historyItem[i + 1].indexOf(':') + 1)}\n`;
          i++;
        } else {
          response += `${line}\n`;
        }
      }

      message.reply(response);
    }
  },
};
