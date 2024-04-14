const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'cwa',
    description: 'cwa command',
    async execute(message, args) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        if (message.author.bot) return;

        if (args.length < 2) {
            return message.reply('ユーザーのメンション、ID、タグ、およびメッセージのイメージを入力してください。');
        }

        const userIdentifier = args[0];
        const contentImage = args.slice(1).join(' ');

        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first() || await message.client.users.fetch(userIdentifier.slice(2, -1)).catch(() => null);
        } else if (/^\d+$/.test(userIdentifier)) {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        } else if (message.guild) {
            const member = message.guild.members.cache.find((m) => m.user.tag === userIdentifier);
            user = member ? member.user : null;
        }

        if (!user) {
            return message.reply('指定されたユーザーが見つかりません。');
        }

        const name = user.displayName;
        const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.apikey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `${name} が ${contentImage} 一言 として言うと・・・`
            })
        };

        try {
            const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
            const data = await response.json();
            const content = data.choices && data.choices[0] && data.choices[0].text ? data.choices[0].text.trim() : '';

            const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(avatarURL)}&content=${encodeURIComponent(content)}`;

            message.reply(miqApiUrl);
        } catch (error) {
            console.error(error);
            message.reply('OpenAI API にリクエストを送信できませんでした。');
        }
    },
};
