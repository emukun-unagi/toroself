module.exports = {
    name: 'server',
    description: 'Display server information',
    execute(message) {
        const server = message.guild;
        if (!server) {
            return message.channel.send('This command can only be used in a server.');
        }

        const owner = server.owner;
        const memberCount = server.memberCount;
        const channelCount = server.channels.cache.size;
        const roleCount = server.roles.cache.size;
        const boostLevel = server.premiumTier;
        const boostCount = server.premiumSubscriptionCount;

        const serverInfo = `**サーバー情報:**\n\`\`\`\n` +
            `サーバー: ${server.name} (${server.id})\n` +
            `オーナー: ${owner.user.tag} (${owner.id})\n` +
            `メンバー: ${memberCount}\n` +
            `チャンネル: ${channelCount}\n` +
            `ロール: ${roleCount}\n` +
            `ブースト: ${boostLevel} (${boostCount} boosts)\n` +
            `\`\`\``;

        message.channel.send(serverInfo);
    },
};
