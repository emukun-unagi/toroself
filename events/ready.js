const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const status = {
            activities: [{
                name: config.status.text,
                type: config.status.type
            }],
            status: config.status.presence
        };

        const button = {
            type: 2, // TYPE: 2 is a BUTTON with URL
            style: 1,
            label: 'とろろ',
            url: 'https://example.com', // ここに移動するURLを指定
        };

        client.user.setPresence(status);

        client.api.applications(client.user.id).guilds(config.guildId).commands.post({
            data: {
                name: 'profile',
                description: 'とろろのプロフィールを表示します。',
                options: [],
            },
        });

        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton()) return;

            if (interaction.customId === 'profile_button') {
                // ボタンが押されたとき、URLに移動するのでここでは何も返信しない
            }
        });

        console.log(`${client.user.tag} is online!`);
    },
};
