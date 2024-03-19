const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const whitelistPath = path.join(__dirname, '../whitelist.json');

module.exports = {
    name: 'make',
    description: 'make command',
    execute(message, args) {
        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
        const userID = message.author.id;

        if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
            const user = message.author;
            const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

            const content = args.join(' ');
            const name = encodeURIComponent(user.displayName);
            const tag = encodeURIComponent(user.tag);
            const contentEncoded = encodeURIComponent(content);
            const apiUrl = `https://miq-api.onrender.com/type=color&name=${name}&id=${tag}&icon=${avatarURL}&content=${contentEncoded}`;

            message.channel.send(apiUrl)
                .catch(err => {
                    console.error('Error sending message:', err);
                });
        }
    },
};
