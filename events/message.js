module.exports = {
    name: 'message',
    execute(message) {
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            const imageUrl = attachment.url;

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Tokyo',
            };

            const timestamp = new Date().toLocaleString('ja-JP', options);

            console.log('Image Sent:');
            console.log(`Time: ${timestamp}`);
            console.log(`User: ${message.author.tag}`);
            console.log(`Image URL: ${imageUrl}`);
            console.log(`Server: ${message.guild.name} (ID: ${message.guild.id})`);
            console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);
            console.log('------------------------------');
        }

        const prefixMention = new RegExp(`^<@!?${message.client.user.id}> `);
        const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : message.client.config.prefix;

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = message.client.commands.get(command);
        const aliases = message.client.commands.find(x => x.info.aliases.includes(command));

        if (cmd) {
            cmd.run(message.client, message, args);
        } else if (aliases) {
            aliases.run(message.client, message, args);
        } else {
            return;
        }
    },
};
