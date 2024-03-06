const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js-selfbot-v13');
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    name: 'gpt',
    description: 'Generate text using GPT-3.5-turbo',
    async execute(message, args) {
        if (message.author.bot) return;

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
                        "content": inputText,
                        "role": "system",
                        "content": "あなたの名前はdis太郎です。あなたは自分のことを指すときに私と言います。あなたは質問に答える優秀なアシスタントです。あなたは語尾にその文にあった絵文字をつけます。"
                    }]
                })
            });

            const data = await response.json();

            if (data.choices && data.choices.length > 0) {
                const replyText = data.choices[0].message.content.trim();
                message.channel.send(replyText);
            } else {
                console.error('GPT-3 API response is not in the expected format:', data);
                message.channel.send('An error has occurred, please try again later.');
            }
        } catch (error) {
            console.error('GPT-3 API error:', error);
            message.channel.send('An error has occurred, please try again later.');
        }
    },
};
