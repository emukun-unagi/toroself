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
            type: 1,
            style: 1,
            label: 'とろろ',
            emoji: {
                name: 'icon',
                id: null,
            },
            custom_id: 'profile_button',
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
                interaction.reply('とろろのプロフィール');
            }
        });

        console.log(`${client.user.tag} is online!`);
    },
};
