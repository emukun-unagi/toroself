const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
    name: 'ping',
    description: 'ping command',
    execute(message, args) {
        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
        const userID = message.author.id;

        if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
            message.reply('Pinging...').then(sentMessage => {
                const ping = sentMessage.createdTimestamp - message.createdTimestamp;
                sentMessage.edit(`${ping}ms`);
            });
        }
    },
};
