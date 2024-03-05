module.exports = {
    name: 'autoReaction',
    aliases: ['ar'],
    description: 'Enable or disable auto-reaction with the specified emoji.',
    usage: 'autoReaction <emoji>',
    execute(message, args) {
        const prefix = process.env.Prefix;
        const emoji = args[0];

        if (!message.content.startsWith(prefix)) return;

        const command = message.content.slice(prefix.length).trim().split(/ +/)[0];

        if (command !== 'autoReaction' && command !== 'ar') return;

        if (!emoji) {
            message.reactions.removeAll().catch(error => console.error('Failed to remove reactions:', error));
            message.channel.send('Auto-reaction turned off.');
            return;
        }

        message.react(emoji).catch(error => console.error('Failed to react with emoji:', error));
    },
};
