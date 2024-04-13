const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');




module.exports = {
  name: 'snipe',
  description: 'snipe command',
  execute(message, args) {
    const channelId = message.channel.id;
    const historyPath = path.join(__dirname, `../history/${channelId}.txt`);

    if (!fs.existsSync(historyPath)) {
      message.reply('No message history found.');
      return;
    }

    const history = fs.readFileSync(historyPath, 'utf8');
    const messages = history.split('--end--');

    if (args.length < 1) {
      args = [messages.length - 1];
    } else if (isNaN(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > messages.length) {
      message.reply('Invalid message number.');
      return;
    }

    const messageIndex = parseInt(args[0]) - 1;
    const messageText = messages[messageIndex].split('--author--')[1];
    const messageTime = messages[messageIndex].split('--author--')[0];

    if (messageText.startsWith('deleted by ')) {
      message.channel.send(`${messageText.slice(11)}\n---\n${messageTime}`);
    } else {
      message.channel.send(`${messageText}\n---\n${messageTime}`);
    }
  },
};
