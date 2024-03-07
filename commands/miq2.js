const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'miq2',
    description: 'Send information about the replied user and message to miq-api',
    async execute(message) {
        if (message.author.bot || !message.reference) return;

        const repliedMessage = await message.channel.messages.fetch(message.reference.messageID);
        const user = repliedMessage.author;
        const name = user.nickname || user.username || user.tag; // Use user.tag if nickname and username are undefined

        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(repliedMessage.content)}`;

        message.channel.send(miqApiUrl);
    },
};
