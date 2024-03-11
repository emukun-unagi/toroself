const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'addition',
    description: 'Add user ID to whitelist',
    execute(message, args) {
        const userID = message.author.id;
        if (userID === config.owner) {
            if (!args[0]) {
                return message.reply('追加するユーザーIDを入力してください。');
            }

            const whitelistPath = path.join(__dirname, '../whitelist.json');
            let whitelist = {};
            try {
                whitelist = require(whitelistPath);
            } catch (error) {
                console.error('Error loading whitelist:', error);
                return message.reply('ホワイトリストの読み込み中にエラーが発生しました。');
            }

            const userToAdd = args[0];

            if (whitelist.allowedUsers.includes(userToAdd)) {
                return message.reply('ユーザーはすでにホワイトリストに載っています。');
            }

            whitelist.allowedUsers.push(userToAdd);

            fs.writeFile(whitelistPath, JSON.stringify(whitelist, null, 2), (error) => {
                if (error) {
                    console.error('Error saving whitelist:', error);
                    return message.reply('ホワイトリストの保存中にエラーが発生しました。');
                }
                message.reply(`${userToAdd} がホワイトリストに追加されました。`);
            });
        }
    },
};
