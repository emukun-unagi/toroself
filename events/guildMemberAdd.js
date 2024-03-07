// guildMemberAdd.js

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member, client) {
        const targetGuildId = '1168172431643517059';
        const targetChannelId = '1210452036865499219';

        // サーバーが正しいか確認
        if (member.guild.id !== targetGuildId) return;

        // メッセージを送りたいチャンネルを取得
        const targetChannel = member.guild.channels.cache.get(targetChannelId);

        // メッセージを送信
        if (targetChannel) {
            // 5秒後にメッセージを送信する
            setTimeout(() => {
                targetChannel.send(`ようこそ${member.user.name}さん\nよろしくお願いします！\n<#1178224908359172126> で自己紹介してくれると嬉しいです`);
            }, 5000); // 5000ミリ秒（5秒）
        } else {
            console.error('指定されたチャンネルが見つかりません。');
        }
    },
};
