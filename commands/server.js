const { prefix } = require('../config.json');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'server',
    description: 'server command',
    async execute(message) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        if (!message.guild) {
            return message.channel.send('このコマンドはサーバーでのみ使用できます。');
        }

        const server = message.guild;
        const owner = await server.members.fetch(server.ownerId).catch(() => null);

        const memberCount = server.memberCount;
        const channelCount = server.channels.cache.size;

        const roles = server.roles.cache.filter(role => role.name !== '@everyone');
        const roleCount = roles.size;

        const boostLevel = server.premiumTier.replace('TIER_', ''); // Remove the "TIER_" prefix
        const boostCount = server.premiumSubscriptionCount;

        const creationDate = server.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Format creation date
        const serverInfo = `**サーバー情報:**\n\`\`\`\n` +
            `サーバー: ${server.name} (${server.id})\n` +
            `オーナー: ${owner ? `${owner.user.tag} (${owner.id})` : 'N/A'}\n` +
            `メンバー: ${memberCount}\n` +
            `チャンネル: ${channelCount}\n` +
            `ロール: ${roleCount}\n` +
            `ブースト: ${boostLevel} (${boostCount} boosts)\n` +
            `作成日: ${creationDate}\n` +
            `\`\`\``;

        message.reply(serverInfo);
    },
};
