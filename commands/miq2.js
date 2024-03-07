const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'miq2',
    description: 'Send information about the replied user and message to miq-api',
    async execute(message) {
        if (message.author.bot || !message.reference) return;

        const repliedMessage = await message.channel.messages.fetch(message.reference.messageID);
        const user = repliedMessage.author;
        const member = repliedMessage.guild.members.cache.get(user.id);
        const name = (member ? member.nickname : user.username).trim() || user.tag; // Use member's nickname if available, otherwise use username or user.tag

        const miqApiUrl = `https://miq-api.onrender.com/?type=color&name=${encodeURIComponent(name)}&id=${encodeURIComponent(user.tag)}&icon=${encodeURIComponent(user.displayAvatarURL({ format: 'png' }))}&content=${encodeURIComponent(repliedMessage.content)}`;

        message.channel.send(miqApiUrl);
    },
};
