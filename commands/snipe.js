const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

const HISTORY_PATH = './history';

module.exports = {
  name: 'snipe',
  description: 'snipe command',
  execute(message, args) {
    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
    const userID = message.author.id;

    if (!fs.existsSync(HISTORY_PATH)) {
      fs.mkdirSync(HISTORY_PATH);
    }

    const historyPath = path.join(HISTORY_PATH, `${message.channel.id}.txt`);

    if (!fs.existsSync(historyPath)) {
      fs.writeFileSync(historyPath, '');
    }

    const history = fs.readFileSync(historyPath, 'utf8').split('-----\n');
    const lines = history.map(line => line.split('\n').filter(Boolean)).filter(line => line.length > 0);

    if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
      if (args.length < 1) {
        message.reply('Usage: +snipe [number]');
        return;
      }

      const num = Number(args[0]);

      if (isNaN(num)) {
        message.reply('Invalid number');
        return;
      }

      if (num <= 0 || num > lines.length) {
        message.reply(`Number must be between 1 and ${lines.length}`);
        return;
      }

      const targetLines = lines[lines.length - num];

      const reply = targetLines
        .map((line, i) => {
          if (line.startsWith('deleted by ')) {
            const index = line.indexOf(': ');
            return `deleted by ${line.slice(9, index)}: ${line.slice(index + 2)}`;
          } else if (line.startsWith('edited by ')) {
            const index = line.indexOf(': ');
            return `edited by ${line.slice(8, index)}: ${line.slice(index + 2)}`;
          } else {
            return line;
          }
        })
        .join('\n');

      message.reply(reply);
    }
  },
};
