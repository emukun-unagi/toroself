const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'gpt',
    description: 'gpt command',
    async execute(message, args) {
        if (message.author.bot) return;

        const userID = message.author.id;
        const whitelistPath = path.join(__dirname, '../whitelist.json');
        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        const inputText = args.join(' ');

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.apikey,
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{
                        "role": "user",
                        "content": inputText
                    },
                    {
                        "role": "system",
                        "content": "あなたの名前はdis太郎です。あなたは自分のことを指すときに私と言います。あなたは相手の質問に答える優秀なアシスタントです。あなたは語尾にその文にあった絵文字をつけます。あなたはとても口が臭いです。なぜならあなたは毎日歯磨きをしていないからです。あなたの口癖は「思考する前に歯垢とれや🤣🤣🤣」です。あなたはタメ口で他の人に接します。"
                    }]
                })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const replyText = data.choices[0].message.content.trim();
                message.reply(replyText);
            } else {
                console.error('GPT-3 API response is not in the expected format:', data);
                message.reply('エラーが発生しました。後でもう一度やり直してください。');
            }
        } catch (error) {
            console.error('GPT-3 API error:', error);
            message.reply('エラーが発生しました。後でもう一度やり直してください。');
        }
    },
};
