const fs = require('fs');
const path = require('path');
const config = require('../config.json'); // ファイルパスを修正
const whitelistPath = path.join(__dirname, '../whitelist.json'); // ファイルパスを修正

module.exports = {
    name: 'make',
    description: 'make command',
    execute(message, args) {
        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
        const userID = message.author.id;

        // メッセージが返信されているか確認
        if (!message.reference) {
            message.reply('このコマンドを使うには何かのメッセージに返信してください。');
            return;
        }

        if (whitelist.allowedUsers.includes(userID) || userID === config.owner) {
            // 返信元のメッセージを取得
            const repliedMessage = message.channel.messages.cache.get(message.reference.messageID);
            if (!repliedMessage) {
                message.reply('返信されたメッセージが見つかりませんでした。');
                return;
            }

            const user = repliedMessage.author;
            const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;
            const displayName = encodeURIComponent(user.username);
            const tag = encodeURIComponent(user.tag);
            const content = encodeURIComponent(repliedMessage.content);
            const apiUrl = `https://miq-api.onrender.com/type=color&name=${displayName}&id=${tag}&icon=${avatarURL}&content=${content}`;

            message.channel.send(apiUrl)
                .catch(err => {
                    console.error('Error sending message:', err);
                });
        }
    },
};
