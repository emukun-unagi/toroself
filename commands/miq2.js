const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'miq2',
    description: 'Send information about the command user and message to miq-api',
    async execute(message) {
        if (message.author.bot) return;

        const user = message.author;
        const name = user.nickname || user.username;

        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(message.content)}`;

        message.channel.send(miqApiUrl);
    },
};
