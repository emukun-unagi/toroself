const Discord = require('discord.js-selfbot-v13');
const fs = require('fs').promises;

module.exports = {
    name: 'snipe',
    description: 'Retrieve deleted messages from the channel history',
    async execute(message, args) {
        // Parse the number of messages to retrieve
        const snipeCount = parseInt(args[0]) || 1;

        // Get the channel ID and history file path
        const channelId = message.channel.id;
        const historyFilePath = `./history/${channelId}.txt`;

        try {
            // Read the history file
            const historyData = await fs.readFile(historyFilePath, 'utf-8');
            const messages = historyData.split('\n').filter(Boolean);

            // Get the last N deleted messages
            const snipedMessages = messages.slice(-snipeCount).reverse();

            if (snipedMessages.length === 0) {
                message.channel.send('No deleted messages found.');
                return;
            }

            // Create an embed to display the sniped messages
            const embed = new Discord.MessageEmbed()
                .setTitle(`Last ${snipeCount} Deleted Message${snipeCount > 1 ? 's' : ''}`)
                .setColor('#ff0000') // Customize the color if needed
                .setDescription(snipedMessages.join('\n'));

            // Send the embed to the channel
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error retrieving sniped messages:', error);
            message.channel.send('An error occurred while retrieving sniped messages.');
        }
    },
};
