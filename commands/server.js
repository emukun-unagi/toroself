module.exports = {
    name: 'server',
    description: 'Display server information',
    execute(message) {
        if (!message.guild) {
            return message.channel.send('This command can only be used in a server.');
        }

        const server = message.guild;
        const owner = server.owner;
        const memberCount = server.memberCount;
        const channelCount = server.channels.cache.size;
        const roleCount = server.roles.cache.size;
        const boostLevel = server.premiumTier;
        const boostCount = server.premiumSubscriptionCount;

        const serverInfo = `**Server Information**\n\`\`\`\n` +
            `Server Name: ${server.name} (${server.id})\n` +
            `Owner: ${owner ? `${owner.user.tag} (${owner.id})` : 'N/A'}\n` +
            `Members: ${memberCount}\n` +
            `Channels: ${channelCount}\n` +
            `Roles: ${roleCount}\n` +
            `Boost Level: ${boostLevel} (${boostCount} boosts)\n` +
            `\`\`\``;

        message.channel.send(serverInfo);
    },
};
