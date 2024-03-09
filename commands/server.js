module.exports = {
    name: 'server',
    description: 'Display server information',
    async execute(message) {
        if (!message.guild) {
            return message.channel.send('This command can only be used in a server.');
        }

        const server = message.guild;
        const owner = await server.members.fetch(server.ownerId).catch(() => null);

        const memberCount = server.memberCount;
        const channelCount = server.channels.cache.size;

        const roles = server.roles.cache.filter(role => role.name !== '@everyone');
        const roleCount = roles.size;

        const boostLevel = server.premiumTier.replace('TIER_', ''); // Remove the "TIER_" prefix
        const boostCount = server.premiumSubscriptionCount;

        const serverInfo = `**サーバー情報:**\n\`\`\`\n` +
            `サーバー: ${server.name} (${server.id})\n` +
            `オーナー: ${owner ? `${owner.user.tag} (${owner.id})` : 'N/A'}\n` +
            `メンバー: ${memberCount}\n` +
            `チャンネル: ${channelCount}\n` +
            `ロール: ${roleCount}\n` +
            `ブースト: ${boostLevel} (${boostCount} boosts)\n` +
            `\`\`\``;

        message.reply(serverInfo);
    },
};
