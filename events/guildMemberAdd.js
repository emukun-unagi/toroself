module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member, client) {
        const targetGuildId = '1168172431643517059';
        const targetChannelId = '1204780250450370572';

        if (member.guild.id !== targetGuildId) return;

        const targetChannel = member.guild.channels.cache.get(targetChannelId);

        if (targetChannel) {
            setTimeout(() => {
                targetChannel.send(`よろしくお願いします！`);
                targetChannel.send(`<#1178224908359172126> で自己紹介してくれると嬉しいです`);
            }, 5000);
        } else {
            console.error('The specified channel cannot be found.');
        }
    },
};
